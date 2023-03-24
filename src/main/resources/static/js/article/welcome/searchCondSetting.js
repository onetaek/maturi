let searchKeyWordInput = document.querySelector(".search-input");//검색 keyword input
let searchCategoryValue = document.querySelector(".search-category-value");//hidden input
let searchDropdownList = document.querySelectorAll(".dropdown-list-item");//dropdown li들
let hasArticle = true;

// keyword검색 조건(dropdown버튼)
for(let i = 0 ; i < searchDropdownList.length; i++){
    searchDropdownList[i].addEventListener("click",()=>{

        console.log("li요소",searchDropdownList[i]);
        console.log('name에 넣을 값',searchDropdownList[i].getAttribute("data-keyword-name"));
        console.log('value에 넣을 값',searchKeyWordInput.value);

       searchCategoryValue.setAttribute("name",
           searchDropdownList[i].dataset.name);
       document.querySelector('input[name="keywordName"]').value
        =searchDropdownList[i].dataset.name;
    });
}

function searchCondSetting(event){
    console.log("무슨 동작이니?",event);
    if(!$('#my-local').is(':checked')){//관심지역이 선택이 되지 않았다면
        $('input[name="latitude"]').removeAttr("value");
        $('input[name="longitude"]').removeAttr("value");
    }
    if($('#category').is(':checked')){//카테고리가 선택되었다면
        document.querySelector('input[name="category"]')
            .setAttribute("value",
                document.querySelector('label[for="category"]').innerText );
    }
    if(!$('#all').is(':checked')&&
        !$('#follow').is(':checked')&&
        !$('#local').is(':checked')&&
        !$('#my-local').is(':checked')&&
        !$('#category').is(':checked')){//혹시 아무것도 체크가 안되어있다면
        $('input[name="latitude"]').removeAttr("value");
        $('input[name="longitude"]').removeAttr("value");
    }
    //동적 hidden input에 value속성에 값추가
    searchCategoryValue.setAttribute("value",searchKeyWordInput.value);
    console.log(document.querySelector('input[name="radioCond"]').value);


    //------search조건에 맞는 json데이터 만드는 과정--------
    console.log("라디오 버튼 전체 선택 이냐?",$('#all').is(':checked'))
    console.log("라디오 버튼 follow 선택 이냐?",$('#follow').is(':checked'))
    console.log("라디오 버튼 관심지역 선택 이냐?",$('#local').is(':checked'))
    console.log("라디오 버튼 내주변 선택 이냐?",$('#my-local').is(':checked'))
    console.log("라디오 버튼 음식점 카테고리 선택 이냐?",$('#category').is(':checked'))
    console.log("라디오 버튼 좋아요 선택 이냐?",$('#like').is(':checked'))

    let radioCond = "everything";
    if($('#all').is(':checked')){
        radioCond = "everything"
    }else if($('#follow').is(':checked')){
        radioCond = "follow"
    }else if($('#local').is(':checked')){
        radioCond = "interLocal"
    }else if($('#my-local').is(':checked')){
        radioCond = "myLocal"
    }else if($('#category').is(':checked')){
        radioCond = "category"
    }else if($('#like').is(':checked')){
        radioCond = "like"
    }

    let latitude = $('#local').is(':checked') ? $('input[name="latitude"]').val() : null;
    let longitude = $('#local').is(':checked') ? $('input[name="longitude"]').val() : null;
    let category = $('#category').is(':checked') ? $('input[name="category"]').val() : null;


    let content = searchCategoryValue.name === "content" ? searchKeyWordInput.value : null;
    let writer = searchCategoryValue.name === "writer" ? searchKeyWordInput.value : null;
    console.log("태그를 선택했나요?",searchCategoryValue.name === "tag");
    let tag = searchCategoryValue.name === "tag" ? searchKeyWordInput.value : null;
    let restaurantName = searchCategoryValue.name === "restaurantName" ? searchKeyWordInput.value : null;
    let all = searchCategoryValue.name === "all" ? searchKeyWordInput.value : null;
    if(!$('#follow').is(':checked')&&
        !$('#local').is(':checked')&&
        !$('#my-local').is(':checked')&&
        !$('#category').is(':checked')){//혹시 아무것도 체크가 안되어있다면
    }
    let lastArticleInput = document.querySelector('input[name="lastArticleId"]');
    let lastArticle;
    if(lastArticleInput.value === "" || lastArticleInput.value === null){
        lastArticle == null;
    }else{
        lastArticle = lastArticleInput.value;
    }
    let obj = {
        'radioCond': radioCond,//
        'latitude': latitude,//
        'longitude': longitude,//
        'category': category,//
        'content': content,//
        'writer': writer,//
        'tag': tag,//
        'restaurantName': restaurantName,//
        'all': all,//
        'keyword': searchKeyWordInput.value,//
        'lastArticleId': lastArticle,
        'size': 5, // max page size
        'event' : event
    };
    return obj;
}

