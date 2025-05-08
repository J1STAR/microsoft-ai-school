import cv2 as cv
import matplotlib.pyplot as plt

image = cv.imread("2025.05.08/ch3/soccer.jpg")
h = cv.calcHist([image], [2], None, [256], [0, 256])

plt.plot(h, color="r", linewidth=1)
plt.show()
