import cv2 as cv

image = cv.imread("2025.05.08/ch3/rose.png")
patch_image = image[250:350, 170:270, :]

image = cv.rectangle(image, (170, 250), (270, 350), (255, 0, 0), 3)

patch_image_1 = cv.resize(patch_image, dsize=(0, 0), fx=5, fy=5, interpolation=cv.INTER_NEAREST)
patch_image_2 = cv.resize(patch_image, dsize=(0, 0), fx=5, fy=5, interpolation=cv.INTER_LINEAR)
patch_image_3 = cv.resize(patch_image, dsize=(0, 0), fx=5, fy=5, interpolation=cv.INTER_CUBIC)
patch_image_4 = cv.resize(patch_image, dsize=(0, 0), fx=5, fy=5, interpolation=cv.INTER_LANCZOS4)

cv.imshow("Original", image)
cv.imshow("Resize nearest", patch_image_1)
cv.imshow("Resize bilinear", patch_image_2)
cv.imshow("Resize bicubic", patch_image_3)
cv.imshow("Resize LANCZOS4", patch_image_4)

cv.waitKey()
cv.destroyAllWindows()
