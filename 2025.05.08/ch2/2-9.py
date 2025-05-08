import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch2/soccer.jpg")

if image is None:
    sys.exit("File not found")

BRUSH_SIZE = 4
LEFT_BUTTON_RGB, RIGHT_BUTTON_RGB = (255, 0, 0), (0, 0, 255)


def painting(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDOWN:
        cv.circle(image, (x, y), BRUSH_SIZE, LEFT_BUTTON_RGB, -1)
    elif event == cv.EVENT_RBUTTONDOWN:
        cv.circle(image, (x, y), BRUSH_SIZE, RIGHT_BUTTON_RGB, -1)
    elif event == cv.EVENT_MOUSEMOVE and flags == cv.EVENT_FLAG_LBUTTON:
        cv.circle(image, (x, y), BRUSH_SIZE, LEFT_BUTTON_RGB, -1)
    elif event == cv.EVENT_MOUSEMOVE and flags == cv.EVENT_FLAG_RBUTTON:
        cv.circle(image, (x, y), BRUSH_SIZE, RIGHT_BUTTON_RGB, -1)
        cv.EVENT_

    cv.imshow("Painting", image)


cv.namedWindow("Painting")
cv.imshow("Painting", image)

cv.setMouseCallback("Painting", painting)

while True:
    if cv.waitKey(1) == ord("q"):
        cv.destroyAllWindows()
        break
