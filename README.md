### 7teamSpintProject
코드잇 7팀 중급 프로젝트


<br>

<div align="center">
  <h1>프로젝트 제목</h1> 
  <p>설명</p>
</div>

<br>

### 7팀 팀원

<br>



<div align="center">
<table>
  <tr>
    <td>
      <img src="https://avatars.githubusercontent.com/u/155063714?v=4?size=100" width="150px" height="15%"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/155063714?v=4?size=100" width="150px" height="15%"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/155063714?v=4?size=100" width="150px" height="15%"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/155063714?v=4?size=100" width="150px" height="15%"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/155063714?v=4?size=100" width="150px" height="15%"/>
    </td> 
  </tr>
  <tr>
    <td align="center">
      팀장
      <a href="https://github.com/">
      장소희
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gohansaem92">
      고한샘
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/">
      신승헌
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/">
        김승래
      </a>
    <td align="center">
      <a href="https://github.com/">
        이율
      </a>
    </tr>
</table>
</div>

<br>

### 담당 기능

### 장소희: 리스트(/list) 페이지
- 질문 리스트 불러오기
- 페이지네이션
- 최신순/이름순 정렬
- 로컬스토리지에 따른 답변페이지 이동

### 고한샘: 답변(/post/id/answer) 페이지
- 답변 리스트 불러오기 및 더보기
- 답변 거절, 수정, 삭제
- 질문 전체삭제
- 카카오톡 공유하기

### 신승헌: 메인(/) 페이지, 404 페이지
- 로컬스토리지에 userid 저장
- GlobalStyle 설정
- 404페이지 애니메이션

### 김승래: 피드(/post/id) 페이지
- 질문 리스트 불러오기 및 더보기
- 질문 작성 모달창
- 링크복사, 페이스북 공유하기
- 
### 이율: 피드(/post/id) 페이지
- 질문 리스트 불러오기 및 더보기
- 질문 작성 모달창
- 링크복사, 페이스북 공유하기

<br>

# 목차
### 1. [프로젝트 소개](#프로젝트-소개) 
  + 개발환경
  + 시연영상
### 2. [프로젝트 구성](#프로젝트-구성)
  + User Flow
  + 폴더 구조
### 3. [주요 기능](#주요-기능)

<br>

# 프로젝트 소개
### 프로젝트 제목
>설명<br>
>제작기간:  24.06.21 ~ 24.07.05

### 개발환경

<div style="display:flex">
  <a>
    <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  </a>
  <a>
  	<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  </a>
  <a>
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  </a>
  <a>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/React router-CA4245?style=for-the-badge&logo=Reactrouter&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  </a>
</div>

- [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/12Team-Project/git12Team)
   develop 브랜치를 메인으로 각 브랜치를 생성해서 작업하고 push하는 방법으로 작업
  
- [<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">](https://discord.gg)
   프로젝트, github 관련 내용과 질문들을 디스코드로 공유
  
- [<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">](https://broken-princess-732.notion.site/12-47d7f99cca2d45edbdb711cedfec0f42)
   프로젝트에 관련해서 지켜야할점 (git 컨벤션, 코드컨벤션 등) 공유

### 시연영상

<div align="center">
  <h3 font-size="20px">메인 페이지</h3>
</div>

https://github.com/12Team-Project/git12Team/assets/162148781/96385da3-30a1-4ba5-ab16-2abb8c207a3d

<br/>

<div align="center">
  <h3>질문목록(List) 페이지</h3>
</div>

https://github.com/12Team-Project/git12Team/assets/162148781/41b3714c-9550-4969-93c2-c4135a39d5af

<br/>

<div align="center">
  <h2>피드(Post) 페이지</h2>
</div>

https://github.com/12Team-Project/git12Team/assets/162148781/ad900f54-b026-4f9a-b190-645e8919f17b

<br/>

<div align="center">
  <h2>답변(Answer) 페이지</h2>
</div>

https://github.com/12Team-Project/git12Team/assets/162148781/88208674-1689-46e9-9165-a34048d299ef

<br/>

<div align="center">
  <h2>404 페이지</h2>
</div>

https://github.com/12Team-Project/git12Team/assets/162148781/c1a8a6db-f7d2-4685-b844-d9df5fcc0e1d

<br/>

# 프로젝트 구성
### User Flow
![image](https://github.com/12Team-Project/git12Team/assets/162148781/939232b6-44b9-4687-a1f9-ddee87bd9af5)


### 폴더 구조
<pre>
src
 ┣ api
 ┣ assets
 ┃ ┣ icons
 ┃ ┗ images
 ┣ components
 ┃ ┣ feed
 ┃ ┃ ┣ answer
 ┃ ┃ ┗ post
 ┃ ┗ list
 ┣ pages
 ┃ ┣ Answer.js
 ┃ ┣ List.js
 ┃ ┣ Main.js
 ┃ ┣ NotFound.js
 ┃ ┗ Post.js
 ┣ styles
 ┗ utils
</pre>

<br>

# 주요 기능

#### [ 메인페이지 ]
- 첫 렌더링시 사용자들을 불러와 state로 관리하고 사용자가 입력한 닉네임과 비교하여 닉네임 중복을 막았습니다.
- 또한 생성에 성공했을때 로컬스토리지에 userId값을 저장해 생성한 유저의 답변페이지로 넘어가는 기능을 리액트스러운 방법(navigate)으로 구현했습니다.
```javascript
const [inputName, setInputName] = useState("");
const [enrolledLists, setErolledLists] = useState(false);

const postNewUser = () => {
  const isExist = enrolledLists.includes(inputName);
  if (inputName === "") {
    alert("이름을 입력해주세요!");
  } else if (isExist === true) {
     alert("이미 존재하는 이름입니다.");
  } else {
    fetchPostSubject();
  }
};

const linkToUser = (userId) => {
    if (userId !== "") {
        navigate(`/post/${userId}/answer`);
        localStorage.setItem("userId", `${userId}`);
    } else {
        alert("나의 페이지가 생성되지 않았어요.");
    }
};

const fetchPostSubject = async () => {
    try {
        const res = await postNewSubject(inputName);
        linkToUser(res.data.id); // id 페이지이동
    } catch (error) {
        console.log(error);
        alert("포스팅이 안되었어요.");
    }
};
```

#### [ 리스트페이지 ]
- list페이지 렌더링시 처음부터 모든 사용자들을 불러와 페이지변경시 보여지는 카드들과 사이즈변경시 보여지는 카드의 갯수가 바뀔때 데이터를 다시 요청하지 않고 불러온 데이터를 페이지에따라, 사이즈에따라 데이터를 정해서 보여주는 방식으로 처리하였습니다.
- 이에따라 페이지네이션, 사이즈변경, 정렬시 api를 요청해서 보여주는 방식이 아니라 갖고있는 데이터들을 가공하여 보여주기 때문에 응답속도를 높혔습니다.
```js
const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(8);

function renderPageButtons(length, isTablet, isMobile) {
    const size = isTablet || isMobile ? 6 : 8;
    setItemsPerPage(size);
    setTotalPages(Math.ceil(length / size));
}

// 페이지 렌더링시 모든 데이터를 불러오고 사이즈에 따라 보여지는 갯수를 정한뒤, 전체 페이지를 계산함.
useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await getListData();
            setData(res.results);
            renderPageButtons(res.count, isTablet, isMobile);
        } catch (e) {
            console.error(e);
        }
    };

    fetchData();
}, []);

// 지정한 사이즈로 바뀔때마다 함수를 실행하여 동적으로 계산함.
useEffect(() => {
    renderPageButtons(data.length, isTablet, isMobile);
}, [isTablet, isMobile]);

// 현재 페이지가 첫번째 페이지와 마지막 페이지일 경우 return시켜 0페이지나 마지막페이지 이상으로 못가게막음.
const handlePageChange = (page) => {
    if (
        page < 1 ||
        page > totalPages ||
        (page === 1 && currentPage === 1) ||
        (page === totalPages && currentPage === totalPages)
    )
        return;
    setCurrentPage(page);
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = sortData(data, order).slice(
    indexOfFirstItem,
    indexOfLastItem
);
```

#### [ 검색 기능 ]
- 렌더링을 했을때 불러온 데이터들 목록의 이름과 검색창에 있는 이름을 비교하여 일치하는 이름들만 나오도록 했습니다.
```js
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const currentItems = sortData(filteredData, order).slice(
        indexOfFirstItem,
        indexOfLastItem
    );

  export default function Search({ searchTerm, onSearchChange }) {
      return (
          <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
          />
      );
  }
```

#### [ 페이지네이션 ]
- 페이지네이션 구현중 페이지가 많아지면 모든페이지를 다 출력하는 문제가 있어서 총 페이지 갯수가 8개 이상일시 현제 페이지 앞뒤와 처음, 마지막 페이지를 제외한 페이지들을 ...으로 처리했습니다.
- 또한 보여지는 아이템이 없어서 0페이지 일경우 1페이지가 되도록 설정했습니다. (검색결과가 없을때 자연스러운 흐름을 위해)
```js

  function renderPageButtons(length, isTablet, isMobile) {
      ...
      setTotalPages(Math.ceil(length / size) === 0 ? 1 : Math.ceil(length / size));
  }

  if (totalPages <= 7) {
    // 페이지가 7개 이하일 때는 모든 페이지 번호를 표시
    ...
  } else {
    // 페이지가 8개 이상일 때
    ...
    if (currentPage <= 4) {
      // 현재 페이지가 4 이하일 때
      ...
    } else if (currentPage >= totalPages - 3) {
      // 현재 페이지가 마지막에서 3 이상일 때
      ...
    } else {
      // 현재 페이지가 5에서 마지막에서 4 사이일 때
      ...
```

![image](https://github.com/12Team-Project/git12Team/assets/162148781/10286416-19ef-4072-88b9-6c13ff27dd5c)

#### [ 개별 피드 페이지 ]
- api 내에서 좋아요, 싫어요 취소 기능이 없어서 로컬스토리지를 이용하여 좋아요나 싫어요를 누르면 다시 못누르게 막았습니다.
```js
    const [reaction, setReaction] = useState(null);
    const [counts, setCounts] = useState({ like: like, dislike: dislike });

    useEffect(() => {
        const storedReaction = localStorage.getItem(`${id}_reaction`);
        if (storedReaction) {
            setReaction(storedReaction);
        }
    }, [id]);

    const handleReactionClick = (type) => {
        if (reaction === null) {
            postReaction(id, type);
            localStorage.setItem(`${id}_reaction`, type);
            setReaction(type);
            setCounts((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
            }));                        
        }
    };

    return (
        <div className="FeedCard-reactionContainer">
            <div
                className={`FeedCard-reaction ${reaction === "like" ? "clicked" : reaction === "dislike" ? "another" : ""}`}
                onClick={() => handleReactionClick("like")}>
                <img
                    src={reaction === "like" ? likeIconOn : likeIconOff}
                    alt="likeIcon"
                    className="FeedCard-reactionIcon"
                />
                좋아요 {counts.like > 0 && counts.like}
            </div>
            <div
                className={`FeedCard-reaction ${reaction === "dislike" ? "clicked" : reaction === "like" ? "another" : ""}`}
                onClick={() => handleReactionClick("dislike")}>
                <img
                    src={
                        reaction === "dislike" ? dislikeIconOn : dislikeIconOff
                    }
                    alt="dislikeIcon"
                    className="FeedCard-reactionIcon"
                />
                싫어요 {counts.dislike > 0 && counts.dislike}
            </div>
        </div>
    );
```

#### [ 더보기 버튼 ]
- 피드페이지(post)에서 질문을 작성하려면 맨 밑으로 내려야하는데 맨밑으로 내리면 무한스크롤이 작동하여 모든 질문을 봐야 질문을 할수있는 문제가 있어서 무한스크롤을 더보기 버튼으로 바꾸었습니다.
- 또한 useEffect의 deps list를 활용하여 질문목록이 바뀌었을때 (질문작성시) 질문리스트가 재렌더링 되게 설계했습니다.
```js
const [questions, setQuestions] = useState([]);
const [nextPage, setNextPage] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
    handleLoadMore();
}, [QuestionList]);

const handleLoadMore = async () => {
    setLoading(true);
    try {
        const data = await getQuestionList(id, nextPage);
        setQuestions([...questions, ...data.results]);
        setNextPage(data.next);
    } catch (e) {
        console.error("Error fetching more data", e);
    } finally {
        setLoading(false);
    }
};

return (
    {loading && <div className="LoadMore">...</div>}
    {!loading && nextPage && (
        <div className="LoadMore button" onClick={handleLoadMore}>
            더보기
        </div>
    )}
);
```

#### [ 질문 작성 모달 ]
- 컴포넌트로 분리해서 코드의 재사용성을 높이고, useState를 사용해 모달의 렌더링을 관리했습니다.
- props로 전달받은 onSubmit 콜백 함수를 호출하는 handleQuestionSubmit 함수를 만들었고,
질문 보내기 버튼의 onClick 프로퍼티로 전달해서 실제 서버에 질문이 추가되도록 했습니다.
```js
export default function Modal({ userData, setIsModalOpen, onSubmit }) {
    const modalBackgroundRef = useRef();
    const [input, setInput] = useState({
        createdDate: new Date(),
        content: "",
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleQuestionSubmit = async () => {
        try {
            const questionData = {
                createdDate: new Date(),
                content: input.content,
            };

            await onSubmit(questionData);
            setIsModalOpen(false);
            window.scrollTo(0, 0);
        } catch (e) {
            console.error("Failed to add question", e);
        }
    };

    const handleModal = (e) => {
        if (e.target === modalBackgroundRef.current) {
            setIsModalOpen(false);
        }
    };
```

#### [ 답변 페이지 ]
- 답변 페이지에서 상단에있는 삭제하기를 누르면 답변자(subject)삭제와 케밥에있는 수정하기, 거절하기, 삭제하기 기능을 구현했습니다.
- 또한 이부분을 컴포넌트로 분리하고 모두 props로 전달하여 리액트스럽게 코드를 짰습니다.
```js
    const handleEditClick = () => {...};
    const handleDeleteQuestion = () => {...};
    const handleRejectAnswer = async () => {...};

    <AnswerDropdown
        handleDeleteQuestion={handleDeleteQuestion}
        handleEditClick={handleEditClick}
        handleRejectAnswer={handleRejectAnswer}
        handleDropdownClick={handleDropdownClick}
        isDropdownOpen={isDropdownOpen}
        hasAnswer={hasAnswer}
        isRejected={isRejected}
        isEdit={isEdit}
    />
```

#### [ 카카오톡 공유하기 ]
- 카카오톡 개발자 api를 받아서 카카오톡 공유하기 기능을 만들었습니다.
```js
import { shareKakaoLink } from "../utils/shareKakaoLink";

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    <img
        className="Header-shareIcon"
        src={shareKakao}  
        alt="shareKakao"
        onClick={() =>
            shareKakaoLink(currentUrl, userData)
        }
    />
```

![image](https://github.com/12Team-Project/git12Team/assets/162148781/5cd5af8c-b6c9-4786-baa0-253abc0f467a)


#### [ 404 페이지 ]
- 404 페이지를 부드럽게 만들어서 사용자가 또다른 재미를 느낄수있게끔 만들었습니다.
![localhost_3000_list1](https://github.com/12Team-Project/git12Team/assets/162148781/76bf5ea5-732c-4e74-8dbf-64e0639cd88b)

