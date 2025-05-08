import cv2 as cv
import numpy as np

image = cv.imread("2025.05.08/ch3/soccer.jpg")
image = cv.resize(image, dsize=(0, 0), fx=0.25, fy=0.25)


def gamma(f, gamma=1.0):
    f1 = f / 255.0
    return np.uint8(255 * (f1**gamma))


gc = np.hstack(
    (
        gamma(image, 0.5),
        gamma(image, 0.75),
        gamma(image, 1.0),
        gamma(image, 2.0),
    )
)
cv.imshow("gamma", gc)

cv.waitKey()
cv.destroyAllWindows()
