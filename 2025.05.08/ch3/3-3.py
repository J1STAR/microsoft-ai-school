import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch3/soccer.jpg")

t, binary_image = cv.threshold(
    image[:, :, 2], 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU
)
print(f"OTSU Algorithm이 찾은 최적의 임계값: {t}")

cv.imshow("R channel", image[:, :, 2])
cv.imshow("R channel binarization", binary_image)

cv.waitKey()
cv.destroyAllWindows()
