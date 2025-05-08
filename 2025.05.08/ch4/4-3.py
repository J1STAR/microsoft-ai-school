import cv2 as cv
import numpy as np

image = cv.imread("2025.05.08/ch4/soccer.jpg")

gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
canny = cv.Canny(gray, 100, 200)

contour, hierarchy = cv.findContours(canny, cv.RETR_LIST, cv.CHAIN_APPROX_NONE)

lcontour = []

for i in range(len(contour)):
    if contour[i].shape[0] > 100:
        lcontour.append(contour[i])

cv.drawContours(image, lcontour, -1, (0, 255, 0), 3)

cv.imshow("Original with contours", image)
cv.imshow("Canny", canny)

cv.waitKey()
cv.destroyAllWindows()