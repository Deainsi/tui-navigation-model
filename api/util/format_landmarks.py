def format_landmarks(hand_landmarks, model):
    landmarks_list = []
    min_x = min_y = min_z = 1
    max_x = max_y = max_z = -1
    for landmark in hand_landmarks.landmark:
        if landmark.x < min_x:
            min_x = landmark.x
        elif landmark.x > max_x:
            max_x = landmark.x

        if landmark.y < min_y:
            min_y = landmark.y
        elif landmark.y > max_y:
            max_y = landmark.y

        if landmark.z < min_z:
            min_z = landmark.z
        elif landmark.z > max_z:
            max_z = landmark.z

    for landmark in hand_landmarks.landmark:
        landmarks_list.extend([(landmark.x - min_x) / (max_x - min_x),
                               (landmark.y - min_y) / (max_y - min_y),
                               (landmark.z - min_z) / (max_z - min_z)])

    return model.predict([landmarks_list])
