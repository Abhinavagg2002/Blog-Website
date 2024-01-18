# In[1]
import sys
import numpy as np

# In[2]
import cv2

# In[3]
from matplotlib import pyplot as plt

# if len(sys.argv) != 2:
#     print("Usage: python ANPR.py <image_path>")
#     sys.exit(1)

# # Get the image path from the command-line argument
# image_path = sys.argv[1]
image_data = sys.stdin.buffer.read()

    # Convert the image data to a NumPy array
nparr = np.frombuffer(image_data, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
# Load the image
#img = cv2.imread('Sample3.jpeg')

# In[4]
sample = img

# In[5]
import imutils
import easyocr

# In[6]



# In[7]
#img = cv2.imread('Sample3.jpeg')

# In[8]
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#plt.imshow(cv2.cvtColor(img_gray, cv2.COLOR_BGR2RGB))
#plt.show()

# In[9]
img_bfilter = cv2.bilateralFilter(img, 15, 15, 15)  #Bilateral filtering is a non-linear, edge-preserving, and noise-reducing smoothing filter.
img_edge = cv2.Canny(img_bfilter, 100, 300)   #cv2.Canny(image, T_lower, T_upper, aperture_size, L2Gradient)
#plt.imshow(cv2.cvtColor(img_edge, cv2.COLOR_BGR2RGB)) 
#plt.imshow(cv2.cvtColor(img_edge, cv2.COLOR_BGR2RGB))
#plt.show()

# In[10]
kp = cv2.findContours(img_edge.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(kp)
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

# In[11]
location = None
for contour in contours:
    approx = cv2.approxPolyDP(contour, 10, True)
    #print(len(approx))
    if len(approx) == 4:
        location = approx
        break

# In[12]
mask = np.zeros(img_gray.shape, np.uint8)
new_image = cv2.drawContours(mask, [location], 0,255, -1)
new_image = cv2.bitwise_and(img, img, mask=mask)

# In[13]
#plt.imshow(cv2.cvtColor(new_image, cv2.COLOR_BGR2RGB))

# In[14]
(x,y) = np.where(mask==255)
(x1, y1) = (np.min(x), np.min(y))
(x2, y2) = (np.max(x), np.max(y))
img_final = img_gray[x1:x2+1, y1:y2+1]

# In[15]
reader = easyocr.Reader(['en'])
reading = reader.readtext(img_final)
#reading

# In[16]
dcti = {'O': '0',
        'I': '1',
        'J': '3',
        'A': '4',
        'G': '6',
        'S': '5'}

ditc = {'0': 'O',
        '1': 'I',
        '3': 'J',
        '4': 'A',
        '6': 'G',
        '5': 'S'}
def format_license(text):
    license_plate_ = ''
    if len(text) == 10:
        map = {0: ditc, 1: ditc, 4: ditc, 5: ditc,
               2: dcti, 3: dcti, 6: dcti, 7: dcti, 8: dcti, 9: dcti}
        for j in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]:
            if text[j] in map[j].keys():
                license_plate_ += map[j][text[j]]
            else:
                license_plate_ += text[j]
    if len(text) == 9:
        map = {0: ditc, 1: ditc, 4: ditc,
               2: dcti, 3: dcti, 5: dcti, 6: dcti, 7: dcti, 8: dcti}
        for j in [0, 1, 2, 3, 4, 5, 6, 7, 8]:
            if text[j] in map[j].keys():
                license_plate_ += map[j][text[j]]
            else:
                license_plate_ += text[j]

    print(license_plate_)

# In[17]
format_license((reading[0][1]).replace(" ", ""))

# In[None]


