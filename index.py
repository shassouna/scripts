import http.client
c = http.client.HTTPConnection('www.example.com')
c.request("HEAD", '')
if c.getresponse().status == 200:
   print('web site exists')