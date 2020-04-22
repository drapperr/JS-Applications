function showDetails() {
    let currentDetails = this.parentNode.querySelector('.details');
    if (currentDetails.style.display === 'none' || currentDetails.style.display === '') {
        currentDetails.style.display = 'block';
    } else {
        currentDetails.style.display = 'none';
    }
}