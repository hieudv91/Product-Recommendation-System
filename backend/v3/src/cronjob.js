const jobtest = {
    name: 'testcron',
    time: '*/10 * * * * *',
    timezone: 'Europe/London',
    request: {
        method: 'GET',
        url: '/cronjob/test'
    },
    onComplete: (res) => {
        console.log(res); // 'hello world'
    }
}

module.exports = [jobtest]