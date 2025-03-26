import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";
import "./assets/mail.scss";

export const Mail = () => {
  const wnapp = useSelector((state) => state.apps.mail);
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [emails, setEmails] = useState([
    { id: 1, sender: "John Doe", subject: "Meeting Reminder", date: "Today", content: "Don't forget our meeting at 3 PM." },
    { id: 2, sender: "Jane Smith", subject: "Project Update", date: "Yesterday", content: "The project is on track for delivery." },
    { id: 3, sender: "Support", subject: "Your Ticket Has Been Resolved", date: "2 days ago", content: "Your issue has been resolved." },
  ]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeMode, setComposeMode] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: "", subject: "", content: "" });
  const [errorVisible, setErrorVisible] = useState(false);
  const [whiteScreen, setWhiteScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
        setWhiteScreen(true);
        setTimeout(() => {
          setWhiteScreen(false);
        }, 5000); // Increased white screen duration to 5 seconds
      }, 2000); // Error message duration remains 2 seconds
    }, 5000); // Initial delay before showing the error

    return () => clearTimeout(timer);
  }, []);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setSelectedEmail(null);
    setComposeMode(false);
    setEmails([
      { id: 4, sender: "Example Sender", subject: `Emails in ${folder}`, date: "Just now", content: "This is a sample email." },
    ]);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setComposeMode(false);
  };

  const handleComposeClick = () => {
    setComposeMode(true);
    setSelectedEmail(null);
    setNewEmail({ to: "", subject: "", content: "" });
  };

  const handleSendEmail = () => {
    if (newEmail.to && newEmail.subject && newEmail.content) {
      alert("Email sent successfully!");
      setComposeMode(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteEmail = (emailId) => {
    setEmails(emails.filter((email) => email.id !== emailId));
    setSelectedEmail(null);
  };

  if (whiteScreen) {
    return <div className="white-screen"></div>;
  }

  return (
    <div
      className="mail floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Mail"
        invert
      />
      {errorVisible && (
        <div className="error-popup">
          <h2>Error</h2>
          <p>An unexpected error occurred. Please try again later.</p>
        </div>
      )}
      <div className="windowScreen flex">
        {/* Sidebar for folders */}
        <div className="mail-sidebar">
          <button className="compose-button" onClick={handleComposeClick}>
            New Message
          </button>
          <ul>
            {["Inbox", "Sent", "Drafts", "Spam", "Trash"].map((folder) => (
              <li
                key={folder}
                className={selectedFolder === folder ? "active" : ""}
                onClick={() => handleFolderClick(folder)}
              >
                {folder}
              </li>
            ))}
          </ul>
        </div>
        {/* Main content area */}
        <div className="mail-content">
          {composeMode ? (
            <div className="compose-email">
              <h2>New Message</h2>
              <input
                type="text"
                placeholder="To"
                value={newEmail.to}
                onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subject"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
              />
              <textarea
                placeholder="Write your email here..."
                value={newEmail.content}
                onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
              ></textarea>
              <div className="compose-actions">
                <button onClick={handleSendEmail}>Send</button>
                <button onClick={() => setComposeMode(false)}>Cancel</button>
              </div>
            </div>
          ) : selectedEmail ? (
            <div className="email-details">
              <h2>{selectedEmail.subject}</h2>
              <p><strong>From:</strong> {selectedEmail.sender}</p>
              <p><strong>Date:</strong> {selectedEmail.date}</p>
              <p>{selectedEmail.content}</p>
              <div className="email-actions">
                <button onClick={() => handleDeleteEmail(selectedEmail.id)}>Delete</button>
                <button onClick={() => setSelectedEmail(null)}>Back</button>
              </div>
            </div>
          ) : (
            <div className="email-list">
              <h2>{selectedFolder}</h2>
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="mail-item"
                  onClick={() => handleEmailClick(email)}
                >
                  <>
                    <div className="mail-sender">{email.sender}</div>
                    <div className="mail-subject">{email.subject}</div>
                    <div className="mail-date">{email.date}</div>
                  </>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mail;