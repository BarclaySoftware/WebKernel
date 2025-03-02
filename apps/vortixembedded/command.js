const commands = [
    'help', 'echo', 'date', 'time', 'uuid', 'academic', 'coord', 'define', 'forecast', 'iplookup', 'myip', 'search', 'solve',
    // '', 
]

function formatCoordinateResult(data) {
    return `Location: ${data.locality}, ${data.principalSubdivision}, ${data.countryName}\n` +
           `Latitude: ${data.latitude}, Longitude: ${data.longitude}\n`;
}
async function fetchJSON(url) {
    const response = await fetch(url);
    return response.json();
}

function formatAcademicResults(data) {
    return data.entries.map(entry => `Title: ${entry.title}\nAuthors: ${entry.authors}\nSummary: ${entry.summary}\nURL: ${entry.link}\n`).join("\n") + "\n";
}

function formatDictionaryResult(data) {
    return data.map(entry => `Word: ${entry.word}\nPhonetic: ${entry.phonetics.map(p => p.text).join(", ")}\nDefinitions: ${entry.meanings.map(m => m.partOfSpeech + " - " + m.definitions.map(d => d.definition).join(", ")).join("\n")}\n`).join("\n") + "\n";
}

function formatIPLookupResult(data) {
    return `IP: ${data.ip}\nCity: ${data.city}\nRegion: ${data.region}\nCountry: ${data.country}\nOrg: ${data.org}\n`;
}

function formatSearchResult(data) {
    return data.query.search.map(result => `Title: ${result.title}\nSnippet: ${result.snippet.replace(/<[^>]+>/g, '')}\nLink: https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}\n`).join("\n") + "\n";
}

function formatAcademicResults(data) {
    return data.entries.map(entry => `Title: ${entry.title}\nSummary: ${entry.summary}\nLink: ${entry.link}\n`).join("\n") + "\n";
}

$(function() {
    $('#terminal').terminal(async function(command) {
        var cmd = command.trim().split(" ");
        var action = cmd[0].toLowerCase();
        var args = cmd.slice(1);
        
        if (action === 'help') {
            this.echo("Available commands: help, clear, echo [text], date, time, uuid, joke, academic [query] [limit], coord [latitude] [longitude], define [word], forecast [city] [state] [country], iplookup [IP address], myip, search [query] [limit], solve [inequality], update\n");
        }
        else if (action === 'joke') {
            let data = await fetchJSON('https://official-joke-api.appspot.com/jokes/random');
            this.echo(`${data.setup}\n${data.punchline}\n`);
        }
        else if (action === '') {
        }
        else if (action === 'echo') {
            this.echo(args.join(" ") + "\n");
        }
        else if (action === 'clear') {
            this.clear();
        }
        else if (action === 'date') {
            this.echo(new Date().toLocaleDateString() + "\n");
        }
        else if (action === 'time') {
            const now = new Date();
            this.echo(now.toLocaleTimeString() + " | Timestamp: " + now.getTime() + "\n");
        }
        else if (action === 'uuid') {
            this.echo(crypto.randomUUID() + "\n");
        }
        else if (action === 'coord') {
            let [lat, lon] = args;
            let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            let data = await fetchJSON(url);
            this.echo(formatCoordinateResult(data));
        }
        else if (action === 'define') {
            let word = args[0];
            let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            let data = await fetchJSON(url);
            this.echo(formatDictionaryResult(data));
        }
        else if (action === 'forecast') {
            let location = args.join(",");
            let apiKey = 'cee5a38a036461af9b79be361322bfd2';
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
            let data = await fetchJSON(url);
            if (data.main) {
                this.echo(`Weather in ${data.name}, ${data.sys.country}:\nTemperature: ${data.main.temp}°C, ${data.weather[0].description}\n`);
            } else {
                this.echo("Location not found.\n");
            }
        }
        else if (action === 'iplookup') {
            let ip = args[0];
            let url = `https://ipinfo.io/${ip}/json`;
            let data = await fetchJSON(url);
            this.echo(formatIPLookupResult(data));
        }
        else if (action === 'myip') {
            let peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            peerConnection.createDataChannel('');
            peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
            peerConnection.onicecandidate = event => {
                if (event && event.candidate && event.candidate.candidate) {
                    let ipMatch = event.candidate.candidate.match(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/);
                    if (ipMatch) {
                        this.echo("Your IP: " + ipMatch[1] + "\n");
                    }
                }
            };
        }
        else if (action === 'search') {
            let query = args.slice(0, -1).join(" ");
            let limit = args[args.length - 1] || 5;
            let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&format=json&origin=*`;
            let data = await fetchJSON(url);
            this.echo(formatSearchResult(data));
        }
        else if (action === 'solve') {
            let input = args.join(" ");
            if (input.includes('=')) {
                try {
                    const steps = MS.matherator.solveEquation(input, false);
                    if (steps.length === 0) {
                        this.echo("No solution steps found. Check the equation syntax.\n");
                        return;
                    }
                    steps.forEach((step, index) => {
                        this.echo(`Step ${index + 1}:\nPrevious: ${step.oldEquation.print()}\nWhat to Do: ${step.changeType}\nNew: ${step.newEquation.print()}\n`);
                    });
                } catch (error) {
                    this.echo(`Error solving equation: ${error.message}\n`);
                }
            } else {
                try {
                    const steps = MS.matherator.simplifyExpression(input);
                    if (steps.length === 0) {
                        this.echo("No simplification steps found. Expression might already be simplified.\n");
                        return;
                    }
                    steps.forEach((step, index) => {
                        this.echo(`Step ${index + 1}:\nPrevious: ${step.oldNode.toString()}\nWhat to Do: ${step.changeType}\nNew: ${step.newNode.toString()}\n`);
                    });
                } catch (error) {
                    this.echo(`Error simplifying expression: ${error.message}\n`);
                }
            }
        }
        else if (action === 'academic') {
            if (args.length < 2) {
                this.echo("About: Searches the arXiv database.\nUsage: academic <query> <no_of_terms>\n");
            } else {
                const noOfTerms = parseInt(args.pop());
                const query = args.join(' ');
                const apiUrl = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${noOfTerms}`;

                this.echo("Fetching data from arXiv...\n");

                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error fetching arXiv data');
                        }
                        return response.text();
                    })
                    .then(data => {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(data, "text/xml");
                        const entries = xmlDoc.getElementsByTagName('entry');
                        const results = Array.from(entries).map(entry => {
                            const title = entry.getElementsByTagName('title')[0].textContent;
                            const summary = entry.getElementsByTagName('summary')[0].textContent;
                            const link = entry.getElementsByTagName('id')[0].textContent;
                            return `Title: ${title}\nSummary: ${summary}\nLink: ${link}`;
                        }).join("\n\n");
                        this.echo(results + "\n");
                    })
                    .catch(error => {
                        this.echo(`Error: ${error.message}\n`);
                    });
            }
        }
        else if (action === 'update') {
            window.location.reload();
        }
        else if (action === 'name') {
            window.location.reload();
        }
        else {
            this.echo("Command not found: " + command + "\n");
        }
    }, {
        greetings: "VORTIX Embedded Terminal\n",
        name: "vortix",
        prompt: "user@web-os:~$ ",
        completion: commands,
        history: true,
        autoCompleteMenu: true,
        login: function(user, password, callback) {
            callback('AUTHENTICATED');
        }
    });
});