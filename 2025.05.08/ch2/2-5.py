import cv2 as cv
import numpy as np
import sys

capture = cv.VideoCapture(0, cv.CAP_AVFOUNDATION)

if not capture.isOpened():
    sys.exit("Failed to connect camera")

frames = []

while True:
    ret, frame = capture.read()

    if not ret:
        print("Failed capture frame")
        break

    cv.imshow("Video Display", frame)

    key = cv.waitKey(1)
    if key == ord('c'):
        frames.append(frame)
    elif key == ord('q'):
        break

capture.release()
cv.destroyAllWindows()

if len(frames) > 0:
    images = frames[0]

    for i in range(1, min(3, len(frames))):
        images = np.hstack((images, frames[i]))

    cv.imshow("Collected Images", images)

    cv.waitKey()
    cv.destroyAllWindows()