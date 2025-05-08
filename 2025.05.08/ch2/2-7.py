import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch2/girl_laughing.jpg")

if image is None:
    print("File Not Found")

def draw(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDOWN:
        cv.rectangle(image, (x, y), (x + 200, y + 200), (0, 0, 255), 2)
    elif event == cv.EVENT_RBUTTONDOWN:
        cv.rectangle(image, (x, y), (x + 100, y + 100), (255, 0, 0), 2)

    cv.imshow("Drawing", image)

cv.namedWindow("Drawing")
cv.imshow("Drawing", image)

cv.setMouseCallback("Drawing", draw)

while(True):
    if cv.waitKey(1) == ord("q"):
        cv.destroyAllWindows()
        break