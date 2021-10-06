let cont = 0;
let html = "";
let html2 = "";
let autorizacion = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM3MTY1YmJhLWRlNjEtNDRjNC1iYWIzLWU5OTdhMDNmY2QyNSIsImlhdCI6MTYzMDI5ODk1Niwic3ViIjoiZGV2ZWxvcGVyL2U0YmYzNTE5LTBlY2EtZDM3OS1lMDY2LTI2NGFiZDEwOTZlMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjguMTI4LjEyOC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.1s9RBkXY5szWgb-7_th-ZgbjvayLs2HK56x588x6Qb7w50hxXZ1d8WKb13jUgEzYwbF445feiTA1qVGIHfOJLw`;

fetch("https://proxy.royaleapi.dev/v1/locations/57000184/rankings/players?limit=20", {
        /* 57000184 */
        headers: {
            Authorization: autorizacion,
        },
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        json.items.forEach(e => {
            html += `<tr>   <td>${e.rank}</td>
                        <td>${e.name}</td>
                        <td>${e.tag}</td>
                        <td>${e.trophies}</td>
                        <td>${e.arena.name}</td>
                    </tr>`;

        });
        document.querySelector("tbody").innerHTML = html;

    }).catch(error => console.log(error))

document.addEventListener("input", () => {
    if (event.target.matches("#busqueda")) {
        html2 = "";
        if (event.target.value.length == 0) document.querySelector("tbody").innerHTML = html;
        if (event.target.value.length < 3) return;
        fetch(`https://proxy.royaleapi.dev/v1/clans?name=${event.target.value}&limit=30`, {
                headers: {
                    Authorization: autorizacion,
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json.items.length);
                if (json.items.length > 0) {
                    html2 = ""
                    json.items.forEach(e => {

                        html2 += `<tr>
                            <td>--</td>
                            <td>${e.name}</td>
                            <td>${e.tag}</td>
                            <td>${e.location.name}</td>
                            <td>${e.members}</td>
                            <td>${e.clanScore}</td>
                        </tr>`;
                    });

                    document.querySelector("tbody").innerHTML = html2;
                } else {
                    document.querySelector("tbody").innerHTML = "no hay respuestas";
                }
            })
    }
})