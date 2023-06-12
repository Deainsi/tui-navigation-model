import math


def get_distance(a: dict, b: dict) -> float:
    return math.sqrt((b['x'] - a['x']) ** 2 + (b['y'] - a['y']) ** 2 + (b['z'] - a['z']) ** 2)


def get_finger_length(finger_landmarks: dict) -> float:
    length = 0

    for finger_landmark in list(finger_landmarks.keys())[:-1]:
        length += get_distance(finger_landmarks[finger_landmark], finger_landmarks[finger_landmark + 1])

    return length


def get_angle(a: float, b: float, c: float) -> float:
    angle_cos = (a ** 2 - b ** 2 - c ** 2) / (-2 * b * c)

    try:
        angle = math.acos(angle_cos)
    except ValueError:
        return 0

    return math.degrees(angle)


def is_finger_up(finger: int, hand_landmarks, height: int, width: int, length: int) -> bool:
    finger_landmarks = dict(
        enumerate([{'x': hand_landmark.x * width, 'y': hand_landmark.y * height, 'z': hand_landmark.z * length}
                   for hand_landmark in hand_landmarks.landmark[finger: finger + 4]]))

    wrist_landmark = hand_landmarks.landmark[0]

    wrist_coordinates = {'x': wrist_landmark.x * width, 'y': wrist_landmark.y * height, 'z': wrist_landmark.z * length}

    if finger == 1:
        finger_landmarks[0], finger_landmarks[1], finger_landmarks[2] = finger_landmarks[1], finger_landmarks[2], \
                                                                        finger_landmarks[3]

        finger_landmarks.pop(3)

    wrist_to_finger_length = get_distance(wrist_coordinates, finger_landmarks[0])

    finger_length = get_finger_length(finger_landmarks)

    wrist_to_tip_length = get_distance(wrist_coordinates, finger_landmarks[list(finger_landmarks.keys())[-1]])

    angle = get_angle(wrist_to_tip_length, wrist_to_finger_length, finger_length)

    return True if (angle > (160 if finger != 1 else 150)) else False
