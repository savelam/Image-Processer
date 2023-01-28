1. This Project is run on port 3001
2. The endpoint for the application is /process_image
3. The full path for the application is http://localhost:5002/process_image/process_image
4. The application accepts five query strings or parameters namely:  
   filename
   width
   height
   input
   output
5. The sample image to process are located in defaults folder in the root of the application
6. However, images can be found in the images folder located in the src directory for conversion if the that image folder already exists with the images files named below.
   default
   icelandwaterfall
   palmtunnel
   santamonica

7. If the query strings are not specified, the application pics a default image and process it.
8. Allowable image extensions are only jpeg, png and jpg

Sample complete url to for test:
http://localhost:5002/process_image/process_image/?filename=default&width=300&height=400&input=jpg
