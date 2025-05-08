import cv2 as cv

image = cv.imread("2025.05.08/ch4/soccer.jpg")
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

grad_x = cv.Sobel(gray, cv.CV_32F, 1, 0, ksize=3)
grad_y = cv.Sobel(gray, cv.CV_32F, 0, 1, ksize=3)

sobel_x = cv.convertScaleAbs(grad_x)
sobel_y = cv.convertScaleAbs(grad_y)

edge_strength = cv.addWeighted(sobel_x, 0.5, sobel_y, 0.5, 0)

cv.imshow("Original", gray)
cv.imshow("Sobel X", sobel_x)
cv.imshow("Sobel Y", sobel_y)
cv.imshow("Edge Strength", edge_strength)

cv.waitKey()
cv.destroyAllWindows()