import cv2 as cv
import sys

img = cv.imread("2025.05.08/ch2/soccer.jpg")

if img is None:
    sys.exit("File Not Found")

cv.imshow("Image Display", img)

cv.waitKey()
cv.destroyAllWindows()
