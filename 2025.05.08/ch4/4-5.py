import skimage
import numpy as np
import cv2 as cv

image = skimage.data.coffee()
cv.imshow("Coffee image", cv.cvtColor(image, cv.COLOR_RGB2BGR))

slic_1 = skimage.segmentation.slic(image, compactness=20, n_segments=600)
sp_image_1 = skimage.segmentation.mark_boundaries(image, slic_1)
sp_image_1 = np.uint8(sp_image_1 * 255.0)

slic_2 = skimage.segmentation.slic(image, compactness=40, n_segments=600)
sp_image_2 = skimage.segmentation.mark_boundaries(image, slic_2)
sp_image_2 = np.uint8(sp_image_2 * 255.0)

cv.imshow("Super pixels (compact 20)", cv.cvtColor(sp_image_1, cv.COLOR_RGB2BGR))
cv.imshow("Super pixels (compact 40)", cv.cvtColor(sp_image_2, cv.COLOR_RGB2BGR))

cv.waitKey()
cv.destroyAllWindows()
