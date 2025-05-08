import cv2 as cv
import sys

capture = cv.VideoCapture(0, cv.CAP_AVFOUNDATION)

if not capture.isOpened():
    sys.exit("Failed to connect camera")

while True:
    ret, frame = capture.read()

    if not ret:
        print("Failed capture frame")
        break

    cv.imshow("Video Display", frame)

    key = cv.waitKey(1)
    if key == ord("q"):
        break

capture.release()
cv.destroyAllWindows()
