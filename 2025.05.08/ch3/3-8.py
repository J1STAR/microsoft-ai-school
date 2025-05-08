import cv2 as cv
import numpy as np

image = np.zeros((300, 300, 3), dtype=np.uint8)

start_point = (100, 100)
end_point = (200, 200)
cv.rectangle(
    image,
    start_point,
    end_point,
    (
        255,
        0,
        0,
    ),
    -1,
)

dx, dy = 50, -30
T = np.float32([[1, 0, dx], [0, 1, dy]])

translated_image = cv.warpAffine(image, T, (300, 300))

center = (150, 150)
angle = 30
scale = 1.0

R = cv.getRotationMatrix2D(center, angle, scale)
print(R)

rotated_image = cv.warpAffine(image, R, (300, 300))

cv.imshow("Original", image)
cv.imshow("Translated (50, -30)", translated_image)
cv.imshow("Rotated 30 deg", rotated_image)

cv.waitKey()
cv.destroyAllWindows()
