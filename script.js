import { getMovieReviewsData } from "./data.js";

let sortDescending = false;

const init = () => {
    const moviewReviewdata = getMovieReviewsData();
    registerHandler(moviewReviewdata);
    paintstatistic(moviewReviewdata);
    sortDataByDate(moviewReviewdata);

}

const paintstatistic = (moviewReviewdata) =>{
    const flatReviewData = moviewReviewdata.flat();
    const totalMovies = moviewReviewdata.length;
    const totalReviews = flatReviewData.length;
    const totalRatings = flatReviewData.reduce((acc, item) =>{
       return acc += item.rating   
    },0);

    const avgRating = (totalRatings/totalReviews).toFixed(2)

    const totalMoviesElement =  document.getElementById("total-movies-id");
    addStat(totalMoviesElement, totalMovies); 
    
    const totalRatingsElement =  document.getElementById("total-rating-id");
    addStat(totalRatingsElement, avgRating);
    
    const totalReviewElement =  document.getElementById("total-review-id");
    addStat(totalReviewElement, totalReviews);
    
}

const addStat = (element, value) =>{
    const span = document.createElement("span");
    span.classList.add("text-xl");
    span.innerText = value;
    element.appendChild(span);
} 

const sortDataByDate = (moviewReviewdata) =>{
   const flatReviewData = moviewReviewdata.flat();
//    flatReviewData.toSorted((a, b) => new Date(b.on) - new Date(a.on)) // way one to sort

  const sortedArr = flatReviewData.toSorted((a, b) => b.on - a.on);  // always use toSorted method, because it doesnot change original source array

   const movieListElement = document.querySelector("#movieListId ul");

   removeAllChildNodes(movieListElement)
   addMovieReviewData(movieListElement, sortedArr)
    
}

const registerHandler = (moviewReviewdata) =>{
    const sortBtn = document.getElementById("sortBtnId");
    sortBtn.addEventListener("click", () => sortByRating(moviewReviewdata))  
} 

const sortByRating = (moviewReviewdata) =>{
    const flatReviewData = moviewReviewdata.flat();
    sortDescending = !sortDescending;
 
     const sortRatingData = sortDescending ? flatReviewData.toSorted((a,b) => b.rating - a.rating)
      : flatReviewData.toSorted((a, b) => a.rating - b.rating)
    const movieListElement = document.querySelector("#movieListId ul");

   removeAllChildNodes(movieListElement);
   addMovieReviewData(movieListElement, sortRatingData); 
}


const addMovieReviewData = (movieListElement, sortedArr) =>{
    sortedArr.map((elem) =>{
        const li = document.createElement("li");
        li.classList.add("font-bold", "bg-gray-500", "p-4", "rounded-md", "text-white");
        li.innerHTML = `
                 <p class="text-xl">${elem.title} - ${elem.rating}</p>
                        <p>${elem.content}</p>
                        <p>By ${elem.by} on ${new Intl.DateTimeFormat('en-BD').format(elem.on)}</p>
        `
        movieListElement.appendChild(li)
       })
       
}


const removeAllChildNodes = (parent) =>{
  while(parent.firstChild){
    parent.removeChild(parent.firstChild)
  }
}


init()







