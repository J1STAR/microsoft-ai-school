import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch3/soccer.jpg")

if image is None:
    sys.exit("File not found")

cv.imshow("Original_RGB", image)
cv.imshow("Upper left half", image[0 : image.shape[0] // 2, 0 : image.shape[1] // 2, :])
cv.imshow(
    "Center half",
    image[
        image.shape[0] // 4 : 3 * image.shape[0] // 4,
        image.shape[1] // 4 : 3 * image.shape[1] // 4,
        :,
    ],
)

cv.imshow("R channel", image[:, :, 2])
cv.imshow("G channel", image[:, :, 1])
cv.imshow("B channel", image[:, :, 0])

cv.waitKey()
cv.destroyAllWindows()
