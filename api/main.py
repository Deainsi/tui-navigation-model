import math
import mediapipe as mp
import cv2
import pyautogui
import joblib
from util.format_landmarks import format_landmarks

x_sensitivity = 1.7
y_sensitivity = 1.4

x_border_pixels = 700
y_border_pixels = 400

drag_ticks = 5
ignore_dist = 40


def get_distance(a: tuple, b: tuple) -> float:
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)


def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_hands = mp.solutions.hands

    cap = cv2.VideoCapture(0)
    height, width, length = cap.read()[1].shape
    screen_width, screen_height = pyautogui.size()
    model = joblib.load('b_classifier_mlp.joblib')
    close_ticks = 0
    dragging = False

    with mp_hands.Hands(
            model_complexity=0,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as hands:

        prev_x = 0
        prev_y = 0

        while cap.isOpened():
            success, image = cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                continue

            results = hands.process(image)
            closed = 0
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(
                        image,
                        hand_landmarks,
                    )

                    landmarks = hand_landmarks.landmark

                    x = int((1 - landmarks[0].x) * width)
                    y = int(landmarks[0].y * height)

                    wrist_x = x_sensitivity * screen_width / width * x - x_border_pixels
                    wrist_y = y_sensitivity * screen_height / height * y - y_border_pixels

                    closed = format_landmarks(hand_landmarks, model)

                if closed == 1:
                    close_ticks += 1
                    if close_ticks > drag_ticks and not dragging:
                        pyautogui.mouseDown()
                        dragging = True
                else:
                    if 2 < close_ticks <= drag_ticks:
                        pyautogui.click()
                    close_ticks = 0
                    if dragging:
                        dragging = False
                        pyautogui.mouseUp()

                if get_distance((prev_x, prev_y), (wrist_x, wrist_y)) > ignore_dist and (close_ticks == 0 or close_ticks > drag_ticks):
                    prev_x, prev_y = wrist_x, wrist_y

                    pyautogui.moveTo(prev_x, prev_y, 0.1, pyautogui.easeOutQuad, _pause=False)

            frame = cv2.flip(image, 1)

            cv2.imshow("Gesture digit recognizer", frame)

            if cv2.waitKey(5) & 0xFF == 27:
                break

    cap.release()


if __name__ == '__main__':
    main()
