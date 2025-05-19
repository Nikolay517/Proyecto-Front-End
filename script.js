const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");
document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const date=document.getElementById("date").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastName || !date || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar Datos")
         return
    }
    const student={name,lastName,grade,date}

    students.push(student);
    
    //console.log(students)
    addStudentToTable(student)

    calculateAverage();

    this.reset()


});
        function addStudentToTable(student){
            const row=document.createElement("tr");
            row.innerHTML=`
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.date}</td>
                <td>${student.grade}</td>
                <td> <button class="edit-btn">Editar</button> </td>
                <td> <button class="delete-btn">Eliminar</button> </td>
                <td> `;
                row.querySelector(".edit-btn").addEventListener("click",function(){
                    editEstudiante(student,row);
                });
                row.querySelector(".delete-btn").addEventListener("click",function(){
                    deleteEstudiante(student,row);
                });
            tableBody.appendChild(row);
        }
        function editEstudiante(student,row){
            const nameInput=document.getElementById("name");
            const lastNameInput=document.getElementById("lastName");
            const dateInput=document.getElementById("date");
            const gradeInput=document.getElementById("grade");

            nameInput.value=student.name;
            lastNameInput.value=student.lastName;
            dateInput.value=student.date;
            gradeInput.value=student.grade;

            students.splice(students.indexOf(student),1);
            row.remove();
            calculateAverage();
        }
            
        
        function deleteEstudiante(student,row){
            const index=students.indexOf(student);
            if(index>-1){
                students.splice(index,1);
                calculateAverage();
                row.remove();
            }
        }

        function calculateAverage(){
            if (students.length === 0) {
                averageDiv.textContent = "Promedio General del Curso: N/A";
                return;
            }

            const total=students.reduce((sum,student)=>sum+student.grade,0);
            const prom=total/students.length;
            averageDiv.textContent="Promedio General del Curso: "+prom.toFixed(2);
        }