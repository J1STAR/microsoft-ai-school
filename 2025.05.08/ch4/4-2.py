import cv2 as cv

image = cv.imread("2025.05.08/ch4/soccer.jpg")

gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

canny_1 = cv.Canny(gray, 50, 150)
canny_2 = cv.Canny(gray, 100, 200)

cv.imshow("Original", gray)
cv.imshow("Canny1", canny_1)
cv.imshow("Canny2", canny_2)

cv.waitKey()
cv.destroyAllWindows()
