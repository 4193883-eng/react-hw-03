export default function loadData() {
    const savedData = JSON.parse(localStorage.getItem('data'))
    return savedData !== null ? savedData : []
}
