import sys

# 파일 호출 시 넘어온 parameter들
argv = sys.argv
results = []

# 0번째(파일명)을 제외한 parameter에 for문 설정
for i in range(1, len(argv)):
    # black box 공간. 원하는 계산 설정.
    results.append(int(argv[i])*100)

# 전달하고자 하는 값 출력
print (results)






# a = ['one', 'two']
# print(a)

