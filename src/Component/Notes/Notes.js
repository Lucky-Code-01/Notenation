import React, {useEffect, useState } from 'react'
import './Notes.css'
import logo from'../Image/notify.png'
import trash from '../Image/delete.png';
export default function Notes() {

    // Date and time here
    const DateAndTime = new Date()
    const currentMonthName = DateAndTime.toLocaleString('default', { month: 'long' });
    const currentDate = DateAndTime.getDate();
    const currentTime = DateAndTime.toLocaleTimeString();


    // state for text 
    const[text,setText] = useState('');
    const[note,setNote] = useState([]);
    const[dark,setDark] = useState(true);
    const[boxColor,setboxColor] = useState('');
    const[boxSelected,setBoxSelected] = useState(null);
    const[searchtext,setSearchText] = useState('');
    const[darktext,setDarkText] = useState('Enable Dark Mode');

    // dark mode 
    const handledarkmode = ()=>{
        setDark(!dark);
        if(dark){
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            setDarkText("Enable Ligth Mode");
        }
        else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            setDarkText("Enable Dark Mode");
        }
    }

    // handle text getter
    const handleText = (e)=>{
        const notetext = e.target.value;
        setText(notetext);
    }

    // handlesave
    const handlesave = ()=>{
        if(text){
            const storedNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
            const updateNote = [...storedNotes,{Id:Date.now(),userNote:text,userColor:boxColor}];
            setNote(updateNote);
            localStorage.setItem('userNotes',JSON.stringify(updateNote));
            setText('');    
        }
    }

    // delete here
    const handleDelete = (index)=>{
        const updateNote = [...note];
        updateNote.splice(index,1);
        setNote(updateNote)
        localStorage.setItem('userNotes',JSON.stringify(updateNote));
    }

    // search text here
    const handhleSearchInp = (e)=>{
        const searchword = e.target.value;
        setSearchText(searchword);   
    }

    const filterData = note.filter((note)=>{
        return note.userNote.toLowerCase().includes(searchtext);
    })

    // search here
    const handleSearch = (e)=>{
        e.preventDefault();
    }

    // color changer here
    const handlecolor = (textcolor)=>{
        setboxColor(textcolor);
    }

    useEffect(()=>{
        const storedNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
        setNote(storedNotes);
    },[])

    

  return (
    <div className='note-container'>
      {/* navbar */}
      <div className='navbar'>
        <div className='logo-info'>
            <img src={logo} alt="" className='logo'/>
            <h1 className='header'>Notify</h1>
        </div>
        <button className='darkmode' onClick={handledarkmode}>{darktext}</button>
      </div>

      {/* searchbar */}
      <div className='search-div'>
        <form action="" className='searchform'>
            <button className='search-btn' onClick={handleSearch}><i className='bx bx-search'></i></button>
            <input type="text" placeholder='search note here...' className='search-box' value={searchtext} onChange={handhleSearchInp}/>
        </form>
      </div>

      {/* notelist */}
      <div className='nodelist'>
        {/* show  */}
        {
            filterData.length>0?filterData.map((element,index)=>{
                return<div className='note_box' style={{backgroundColor:element.userColor}} key={element.Id}>
                            <div className='text-box'>
                                <p className='notetext'>{element.userNote}</p>
                            </div>
                            <div className='note-footer'>
                                <div className='extra-info'>
                                    <h1 className='date'>{currentTime + " "+currentDate + " " + currentMonthName}</h1>
                                    <img src={trash} alt="" className='trash' onClick={()=>handleDelete(index)}/>
                                </div>
                            </div>
                       </div>}):''  
        }
        
        {/* add */}
        <div className='note_box'>
            <div className='color-note-box'>
                <textarea name="" id=""  className='inptext' placeholder='type to add note...' onChange={handleText} maxLength={1000} value={text}></textarea>
                <div className='color-box'>
                    <div style={{backgroundColor:"pink"}} className={`color-chooser ${boxSelected===1?'selected':''}`} onClick={()=>handlecolor("pink",setBoxSelected(1))}></div>
                    <div style={{backgroundColor:"lightgreen"}} className={`color-chooser ${boxSelected===2?'selected':''}`} onClick={()=>handlecolor("lightgreen",setBoxSelected(2))}></div>
                    <div style={{backgroundColor:"#6891fa"}} className={`color-chooser ${boxSelected===3?'selected':''}`} onClick={()=>handlecolor("#6891fa",setBoxSelected(3))}></div>
                    <div style={{backgroundColor:"#fac769"}} className={`color-chooser ${boxSelected===4?'selected':''}`} onClick={()=>handlecolor("#fac769",setBoxSelected(4))}></div>
                    <div style={{backgroundColor:"#faf28b"}} className={`color-chooser ${boxSelected===5?'selected':''}`} onClick={()=>handlecolor("#faf28b",setBoxSelected(5))}></div>
                </div>
            </div>
            <div className='note-footer'>
                <div className='extra-info'>
                    <h1 className='word'>{1000 - text.length } Remaining Letter</h1>
                    <button className='save' onClick={handlesave}>Save</button>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}
