const headers = ["firstName", "lastName","dateOfBirth","gender","phoneNumber","nationalCode","company","roleInCompany"]

$(() => {
    $.get("/employee/all", (data) => {
        console.log(data);

        tableCrator(headers, data);
    });

    $("#createNewEmployee").on("submit", (e) => {
        e.preventDefault();

        const newEmployee = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            dateOfBirth: $("#dateOfBirth").val(),
            gender: $("#gender").val(),
            phoneNumber: $("#phoneNumber").val(),
            nationalCode: $("#nationalCode").val(),
            company: $("#company").val(),
            roleInCompany: $("#roleInCompany").val(),
        };

        $.post("/employee", newEmployee, (data) => {
            console.log(data);
            $("table tbody").append("<tr></tr>")

            for (const key in data) {
                if (!headers.includes(key)) continue;
    
                $("table tbody tr:last").append(`<td>${data[key]}</td>`)
            } 
        });
    });
});


function tableCrator(headers, data) {
    $("table thead").append("<tr></tr>")
    for (const key in data[0]) {
        if (!headers.includes(key)) continue;
        $("table thead tr").append(`<th>${key}</th>`)
    };


    for (let i = 0; i < data.length; i++) {
        $("table tbody").append("<tr></tr>")

        for (const key in data[i]) {
            if (!headers.includes(key)) continue;

            $("table tbody tr:last").append(`<td>${data[i][key]}</td>`)
        }            
    }
}