import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

image = cv.imread("2025.05.08/ch3/JohnHancocksSignature.png", cv.IMREAD_UNCHANGED)

t, binary_image = cv.threshold(
    image[:, :, 3], 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU
)

plt.imshow(binary_image, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()

b = binary_image[
    binary_image.shape[0] // 2 : binary_image.shape[0],
    0 : binary_image.shape[0] // 2 + 1,
]
plt.imshow(b, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()

se = np.uint8(
    [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
    ]
)

b_dilation = cv.dilate(b, se, iterations=1)
plt.imshow(b_dilation, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()

b_erosion = cv.erode(b, se, iterations=1)
plt.imshow(b_erosion, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()

b_closing = cv.erode(b_dilation, se, iterations=1)
plt.imshow(b_closing, cmap="gray"), plt.xticks([]), plt.yticks([])
plt.show()