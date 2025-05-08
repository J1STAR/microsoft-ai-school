import cv2 as cv
import numpy as np

image = cv.imread("2025.05.08/ch4/soccer.jpg")
image_show = np.copy(image)

mask = np.zeros((image.shape[0], image.shape[1]), np.uint8)
mask[:, :] = cv.GC_PR_BGD

BRUSH_SIZE = 8
BACKGROUND_RGB, OBJECT_RGB = (255, 0, 0), (0, 0, 255)


def painting(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDOWN:
        cv.circle(image_show, (x, y), BRUSH_SIZE, BACKGROUND_RGB, -1)
        cv.circle(mask, (x, y), BRUSH_SIZE, cv.GC_FGD, -1)
    elif event == cv.EVENT_RBUTTONDOWN:
        cv.circle(image_show, (x, y), BRUSH_SIZE, OBJECT_RGB, -1)
        cv.circle(mask, (x, y), BRUSH_SIZE, cv.GC_FGD, -1)
    elif event == cv.EVENT_MOUSEMOVE and flags == cv.EVENT_FLAG_LBUTTON:
        cv.circle(image_show, (x, y), BRUSH_SIZE, BACKGROUND_RGB, -1)
        cv.circle(mask, (x, y), BRUSH_SIZE, cv.GC_FGD, -1)
    elif event == cv.EVENT_MOUSEMOVE and flags == cv.EVENT_FLAG_RBUTTON:
        cv.circle(image_show, (x, y), BRUSH_SIZE, OBJECT_RGB, -1)
        cv.circle(mask, (x, y), BRUSH_SIZE, cv.GC_FGD, -1)

    cv.imshow("Painting", image_show)


cv.namedWindow("Painting")
cv.setMouseCallback("Painting", painting)

while True:
    cv.imshow("Painting", image_show)
    if cv.waitKey(1) == ord("q"):
        break

background = np.zeros((1, 65), np.float64)
foreground = np.zeros((1, 65), np.float64)

cv.grabCut(image, mask, None, background, foreground, 5, cv.GC_INIT_WITH_MASK)
mask2 = np.where((mask == cv.GC_BGD) | (mask == cv.GC_PR_BGD), 0, 1).astype("uint8")

grab = image * mask2[:, :, np.newaxis]

cv.imshow("Grab cut image", grab)

cv.waitKey()
cv.destroyAllWindows()
