import React, { useEffect, useState } from 'react';
import axios from 'axios';


//edit: 내 데이터의 경우는 &quot; 이게 쓰여진 경우라 치환값을 변경함 
function ConvertSystemSourcetoHtml(str){
    str = str.replace(/&quot;/g, '"');
    // str = str.replace(/</g,"&lt;");
    // str = str.replace(/>/g,"&gt;");
    // str = str.replace(/\"/g,"&quot;");
     str = str.replace(/&#39;/g,"'");
    // str = str.replace(/\n/g,"<br />");
    return str;
   }

const Convert = ({ text, language }) => {
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    const response = axios
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language,
            key: 'AIzaSyBpXjF6WItTpxRvaLXCFv-9TYe1SFZnX-U'
          }
        }
      )
      .then((response) => {
        // setConvertedText(response.data.data.translations[0].translatedText);
        const regulContent= ConvertSystemSourcetoHtml(response.data.data.translations[0].translatedText);
        // console.log("regulContent: ", regulContent);
         setConvertedText(regulContent);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
  }, [text, language]);

  return <div>{convertedText}</div>;
};

export default Convert;