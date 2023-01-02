from fastapi import FastAPI

# 인스턴스
app = FastAPI()

@app.get('/')
def index():
	return {'data': {'name': 'Cjh'}}
	
@app.get('/about')
def about():
	return {'data': {'name': 'aboutPage'}}
