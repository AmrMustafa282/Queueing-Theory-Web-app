let strBtn = document.querySelector(".start-btn");
let showtableBtn = document.querySelector(".show-tableBtn")
let custNo;
let table1 = document.querySelector(".table1");
let table2 = document.querySelector(".bigTable");
let table3 = document.querySelector(".smalTable")
let data =0;
let data2 =0;
let sumofinter=0;
let sumofduratino=0;
let sumofdelay=0;
let sumofwait=0;
let sumofidle=0;
document.querySelector(".sec2").style.display="none";
document.querySelector(".sec3").style.display="none";
document.querySelector(".sec4").style.display="none";
strBtn.onclick = function()
{
    document.querySelector(".sec2").style.display="flex";
    if(data === 1)
    {
        table1.innerHTML="";
        table2.innerHTML="";
        table3.innerHTML="";
        // showTable();
        // location.reload();
    }
    else
    {
        data =1;
    }
    function showTable(){
        custNo =Number(document.querySelector("#num").value) ;
    let exp =/\d+/
        if(exp.test(custNo) && custNo !="")
        {
            window.scrollTo({top:900,behavior:"smooth"});
            // table1 = document.querySelector(".table1");
            for(let i=0;i<3;i++)
            {
                let row = document.createElement("tr");
                table1.appendChild(row);
                for(let j=0;j<=custNo;j++)
                {
                    let cell = document.createElement("td");
                    if(i == 0 && j == 0)
                    {
                        let text = document.createTextNode("Customer Number");
                        cell.appendChild(text);
                        cell.setAttribute("class","spi");
                    }
                    if(i == 1 && j == 0)
                    {
                        let text = document.createTextNode("Arrival Time");
                        cell.appendChild(text);
                    }
                    if(i == 2 && j == 0)
                    {
                        let text = document.createTextNode("Service Duration");
                        cell.appendChild(text);
                    }
                    if(i==0 && (j>0 && j<=custNo))
                    {
                        let text = document.createTextNode(j);
                        cell.appendChild(text);
                        cell.setAttribute("class","spi");
                    }
                    if((i==1 || i==2) && (j>=1 && j<=custNo))
                    {
                        let dataInp = document.createElement("input");
                        dataInp.setAttribute("class",`class${i}${j}`);
                        cell.appendChild(dataInp);
                    }
                    // let text = document.createTextNode("this is me");
                    // cell.appendChild(text);
                    row.appendChild(cell);
                }
            }
            
            
            showtableBtn.onclick = ()=>{
                showtableBtn.style.display="none";
                document.querySelector(".sec3").style.display="flex";
                document.querySelector(".sec4").style.display="flex";
                if(data2 === 1)
                {
                    table2.innerHTML="";
                // showTable();
                // location.reload();
                }
                else
                {
                    data2 =1;
                }
                window.scrollTo({top:1600,behavior:"smooth"});
                let ArrivalArray =[];
                let ServiceDurationArray=[];
                let timeServiceBegins = [];
                let timeServiceEnds = [];
                let interArrival =[]
                let delay=[];
                let waitTime=[];
                let idleTime=[];
                for(let x =1;x<=custNo;x++)
                {
                ArrivalArray[x-1]=Number(document.querySelector(`.class1${x}`).value);
                ServiceDurationArray[x-1]=Number(document.querySelector(`.class2${x}`).value);
                }
                timeServiceBegins[0]=ArrivalArray[0];
                timeServiceEnds[0]=timeServiceBegins[0]+ServiceDurationArray[0];
                for(let k=1;k<custNo;k++)
                {
                    if(ArrivalArray[k]>=timeServiceEnds[k-1])
                    {
                        timeServiceBegins[k]=ArrivalArray[k];
                        timeServiceEnds[k]=timeServiceBegins[k]+ServiceDurationArray[k];
                    }
                    else if(ArrivalArray[k]<timeServiceEnds[k-1])
                    {
                        timeServiceBegins[k]=timeServiceEnds[k-1];
                        timeServiceEnds[k]=timeServiceBegins[k]+ServiceDurationArray[k];
                    }

                }
                interArrival[0]=ArrivalArray[0];
                for(let k=1;k<custNo;k++)
                {
                    interArrival[k]=ArrivalArray[k]-ArrivalArray[k-1];
                }
                for(let k=0;k<custNo;k++)
                {
                    if(timeServiceBegins[k]>ArrivalArray[k])
                    {
                        delay[k]=timeServiceBegins[k]-ArrivalArray[k];
                    }
                    else
                    {
                        delay[k]=0;
                    }
                }
                for(let k=0;k<custNo;k++)
                {
                    waitTime[k]=delay[k]+ServiceDurationArray[k];
                }
                idleTime[0]=0;
                for(let k=1;k<custNo;k++)
                {
                    if(ArrivalArray[k]>timeServiceEnds[k-1])
                    {
                        idleTime[k]=ArrivalArray[k]-timeServiceEnds[k-1];
                    }
                    else
                    {
                        idleTime[k]=0;
                    }
                }
                // console.log(ArrivalArray);
                // console.log(ServiceDurationArray);
                // console.log(timeServiceBegins);
                // console.log(timeServiceEnds);
                // console.log(interArrival);
                // console.log(delay);
                // console.log(waitTime);
                // console.log(idleTime);



                    const xValues = ArrivalArray;
                    const waitinValues=delay.slice();
                    const runningValues=ArrivalArray.slice();
                    const idleValus=idleTime.slice();

                new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{ 
                    data:waitinValues,
                    borderColor: "red",
                    fill: false
                    }, { 
                    data:runningValues,
                    borderColor: "green",
                    fill: false
                    }, { 
                        data:idleValus,
                    borderColor: "blue",
                    fill: false
                    }]
                    },
                    options: {
                    legend: {display: false}
                    }
                    });
                    

                    


                    // let arrive =[0,1,2,8,11,18];
                    // let end =[4,6,11,15,16,23];
                    let bigarray =[];
                    let finalArray=[];
                    let size = ArrivalArray.length + timeServiceEnds.length;
                    bigarray=ArrivalArray.concat(timeServiceEnds);
                    bigarray.sort((a, b)=> a-b);       //Sort numbers in ascending order
                    for(let i =0;i<size;i++)
                    {
                        for(let j=0;j<size;j++)
                        {
                            if(bigarray[i]==ArrivalArray[j])
                                {
                                    if(bigarray[i+1]==ArrivalArray[j])
                                    {
                                        finalArray[i]=`end ${j-1}`;     // in case arrive of customer is the same end of another customer
                                    }
                                    else
                                        finalArray[i]=`arrive ${j+1}`;
                                }
                                if(bigarray[i]==timeServiceEnds[j])
                                {
                                    finalArray[i]=`end ${j+1}`;
                                }
                        }
                    }
                    console.log(finalArray);


                    
                    
                    

                    let reg1 =/[a-z]+/;
                    let reg2 =/\d+/;
                    for(let m=0;m<=custNo*2;m++)
                    {   
                        let r = document.createElement("tr");
                        table3.appendChild(r);
                        for(let n=0;n<3;n++)
                        {
                            let c = document.createElement("td");
                            if(m==0 && n==0)
                            {
                                let text = document.createTextNode("Event");
                                c.appendChild(text);
                            }
                            if(m==0 && n==1)
                            {
                                let text = document.createTextNode("Customer");
                                c.appendChild(text);
                            }
                            if(m==0 && n==2)
                            {
                                let text = document.createTextNode("Clock Time");
                                c.appendChild(text);
                            }




                            if(((m>0) && (m<=custNo*2)) && n==0)
                            {
                                let str = finalArray[m-1];
                                let text = document.createTextNode(str.match(reg1)[0]);
                                c.appendChild(text);
                                
                            }
                            if(((m>0) && (m<=custNo*2)) && n==1)
                            {
                                let str1 = finalArray[m-1];
                                let text = document.createTextNode(str1.match(reg2)[0]);
                                c.appendChild(text);
                            }


                            if(((m>0) && (m<=custNo*12)) && n==2)
                            {
                                let text = document.createTextNode(bigarray[m-1]);
                                c.appendChild(text);
                            }
                            c.setAttribute("class","spi")
                            r.appendChild(c);

                        }
                    }



                
                for(let p=0;p<custNo+2;p++)
                {
                    let rw = document.createElement("tr")
                    table2.appendChild(rw);
                    for(let o=0;o<9;o++)
                    {
                        let cl = document.createElement("td");
                        if(p==0 && o==0)
                        {
                            let text = document.createTextNode("Customer");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==1)
                        {
                            let text = document.createTextNode("Interarrival Time");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==2)
                        {
                            let text = document.createTextNode("Arrival Time");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==3)
                        {
                            let text = document.createTextNode("Service Time");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==4)
                        {
                            let text = document.createTextNode("Time Service Begins");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==5)
                        {
                            let text = document.createTextNode("Time Service Ends");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==6)
                        {
                            let text = document.createTextNode("Waiting in Queue");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==7)
                        {
                            let text = document.createTextNode("Time Customer in System");
                            cl.appendChild(text);
                        }
                        if(p==0 && o==8)
                        {
                            let text = document.createTextNode("Idle Time of server");
                            cl.appendChild(text);
                        }
                            /* ############################################################################ */

                        if(o==0 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(p);
                            cl.appendChild(text);
                        }
                        if(o==1 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(interArrival[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==2 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(ArrivalArray[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==3 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(ServiceDurationArray[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==4 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(timeServiceBegins[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==5 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(timeServiceEnds[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==6 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(delay[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==7 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(waitTime[p-1]);
                            cl.appendChild(text);
                        }
                        if(o==8 && (p>0 &&p<=custNo))
                        {
                            let text = document.createTextNode(idleTime[p-1]);
                            cl.appendChild(text);
                        }
                            /* ############################################################################ */
                        if(o==0 && (p==custNo+1))
                        {
                            let text = document.createTextNode("Total");
                            cl.appendChild(text);
                        }
                        if(o==1 && (p==custNo+1))
                        {
                            interArrival.forEach((e)=>sumofinter+=e);
                            let text = document.createTextNode(sumofinter);
                            cl.appendChild(text);
                        }
                        if(o==3 && (p==custNo+1))
                        {
                            ServiceDurationArray.forEach((e)=>sumofduratino+=e);
                            let text = document.createTextNode(sumofduratino);
                            cl.appendChild(text);
                        }
                        if(o==6 && (p==custNo+1))
                        {
                            delay.forEach((e)=>sumofdelay+=e);
                            let text = document.createTextNode(sumofdelay);
                            cl.appendChild(text);
                        }
                        if(o==7 && (p==custNo+1))
                        {
                            waitTime.forEach((e)=>sumofwait+=e);
                            let text = document.createTextNode(sumofwait);
                            cl.appendChild(text);
                        }
                        if(o==8 && (p==custNo+1))
                        {
                            idleTime.forEach((e)=>sumofidle+=e);
                            let text = document.createTextNode(sumofidle);
                            cl.appendChild(text);
                        }
                        cl.setAttribute("class","spi")
                        rw.appendChild(cl);
                    }
                }
            }
            
        }
    }
    showTable();



    

        
    
}
