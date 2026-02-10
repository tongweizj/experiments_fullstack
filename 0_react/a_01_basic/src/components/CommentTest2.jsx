import React from 'react';
import ReactDOM from 'react-dom';
import './Comment.css';
//
function Avatar(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
    );
  }
//
function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
  }
//
function Profile(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
} 

// 这是没有把组件拆分的版本，缺点，代码复杂，不容易理解和后续维护
// function Comment(props) {
//     return (
//       <div className="Comment">
//         <div className="UserInfo">
//           <img className="Avatar"
//             src={props.author.avatarUrl}
//             alt={props.author.avatarUrl}
//           />
//           <div className="UserInfo-name">
//             <h2>Author name: {props.author.name} </h2>
//           </div>
//         </div>
//         <div className="Comment-text">
//           {props.text}
//         </div>
//         <div className="Comment-date">
//           {props.date}
//         </div>
//       </div>
//     );
//   }
  //
  function UserProfile()
  {
    let imgs = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&s'
      ];
    const author = {name: "Dan Abramov", avatarUrl: imgs[0]}
    const text = "Member of React Team, Creator of Redux, and lots of other things"
    const date = "01/01/2022"
    //
    return (
      <div>
        <Profile author={author} text={text} date={date} />
      </div>
    )
  }
  //
  export default UserProfile;