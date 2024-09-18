// // document.getElementById('submitFeedback').addEventListener('click', () => {
// //         const feedback = document.getElementById('feedback').value;
    
// //         // Retrieve selected text from storage
// //         chrome.storage.local.get('selectedText', (data) => {
// //             const selectedText = data.selectedText || '';
// //             SendHighlightedText(selectedText);
// //             console.log('Feedback submitted:', { feedback, selectedText });
// //         });
// //     });
// function SendHighlightedText() {
//     const { getToken } = useAuth();

//     const sendText = async (highlightedText) => {
//         try {
//             const token = await getToken();

//             const response = await axios.post(
//                 'https://www.feedbackbrief.com/api/add-feedback', 
//                 {
//                     text: highlightedText
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-type': 'application/json'
//                     }
//                 }
//             );
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error('Error sending highlighted text:', error.response?.data || error.message);
//             } else {
//                 console.error('Unexpected error:', error);
//             }
//         }
//     };
// }

// document.addEventListener("DOMContentLoaded", function() {
// // Function to add event listener
// function addFeedbackListener() {
//     const submitFeedbackButton = document.getElementById('submitFeedback');
//     if (submitFeedbackButton) {
//         submitFeedbackButton.addEventListener('click', () => {
//             const feedback = document.getElementById('feedback').value;

//             // Retrieve selected text from storage
//             chrome.storage.local.get('selectedText', (data) => {
//                 const selectedText = data.selectedText || '';
//                 SendHighlightedText(selectedText);
//                 console.log('Feedback submitted:', { feedback, selectedText });
//             });
//         });
//     } else {
//         console.error("Element with ID 'submitFeedback' not found.");
//     }
// }

// // Call the function to add the listener
// addFeedbackListener();

// // If the element is created dynamically later, you may need to call this function again
// // For example, if you know when the element is created, call addFeedbackListener() again
// });