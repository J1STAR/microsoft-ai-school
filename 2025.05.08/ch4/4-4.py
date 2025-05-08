import cv2 as cv

image = cv.imread("2025.05.08/ch4/apples.jpg")
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

apples = cv.HoughCircles(
    gray, cv.HOUGH_GRADIENT, 1, 200, param1=150, param2=20, minRadius=50, maxRadius=120
)

for i in apples[0]:
    cv.circle(image, (int(i[0]), int(i[1])), int(i[2]), (255, 0, 0), 2)

cv.imshow("Apple Detection", image)

cv.waitKey()
cv.destroyAllWindows()
