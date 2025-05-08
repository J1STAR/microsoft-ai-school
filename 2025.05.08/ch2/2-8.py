import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch2/girl_laughing.jpg")

mouse_status = {
    "ix": None,
    "iy": None
}

if image is None:
    print("File Not Found")
    
def draw(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDOWN:
        mouse_status["ix"], mouse_status["iy"] = x, y
    elif event == cv.EVENT_LBUTTONUP:
        cv.rectangle(image, (mouse_status["ix"], mouse_status["iy"]), (x, y), (0, 0, 255), 2)

    cv.imshow("Drawing", image)

cv.namedWindow("Drawing")
cv.imshow("Drawing", image)

cv.setMouseCallback("Drawing", draw)

while True:
    if cv.waitKey(1) == ord("q"):
        cv.destroyAllWindows()
        break
