import cv2 as cv
import sys

img = cv.imread("2025.05.08/ch2/soccer.jpg")

if img is None:
    sys.exit("File Not Found")

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
gray_small = cv.resize(gray, dsize=(0, 0), fx=0.5, fy=0.5)

cv.imwrite("2025.05.08/ch2/soccer_gray.png", gray)
cv.imwrite("2025.05.08/ch2/soccer_gray_small.png", gray_small)

cv.imshow("Color image", img)
cv.imshow("Gray Image", gray)
cv.imshow("Gray Image Small", gray_small)

cv.waitKey()
cv.destroyAllWindows()
