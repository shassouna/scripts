import requests

def url_checker(url):
	try:
		#Get Url
		get = requests.get(url)
		# if the request succeeds 
		if get.status_code == 200:
			return(f"{url}: exist")
		else:
			return(f"{url}: don't exist, status_code: {get.status_code}")

	#Exception
	except requests.exceptions.RequestException as e:
        # print URL with Errs
		raise SystemExit(f"{url}: is Not reachable \nErr: {e}")

print (url_checker("https://www.google.fr/"))




