import { useParams } from "react-router-dom";



function Noteid(){
    
    const { noteid } = useParams();

    noteid += 1;
    // document.getElementById('output').innerHTML = noteid;
    // return(<h1 id = "output"></h1>);
    console.log(noteid);

    return noteid;

};

export default Noteid;