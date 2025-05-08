import cv2 as cv
import sys

image = cv.imread("2025.05.08/ch2/girl_laughing.jpg")

if image is None:
    sys.exit("File Not Found")

cv.rectangle(image, (830, 30), (1000, 200), (0, 0, 255), 2)
cv.putText(image, "laugh", (830, 24), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

cv.imshow("Draw", image)

cv.waitKey()
cv.destroyAllWindows()