document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add event listeners to tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;
      switchTab(targetTab);
    });
  });

  // Tab switching function
  function switchTab(targetTab) {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    document.querySelector(`[data-tab="${targetTab}"]`).classList.add("active");
    document.getElementById(`${targetTab}-teams`).classList.add("active");
  }

  // Drag and drop functionality
  let draggedTeam = null;
  let draggedTeamPlaceholder = null;

  // Initialize drag and drop for all teams
  initializeDragAndDrop();

  function initializeDragAndDrop() {
    // Get all draggable team elements
    const teams = document.querySelectorAll(".team");
    const teamsLists = document.querySelectorAll(".teams-list");

    // Add event listeners to each team
    teams.forEach((team) => {
      team.addEventListener("dragstart", handleDragStart);
      team.addEventListener("dragend", handleDragEnd);
    });

    // Add event listeners to each teams list (drop targets)
    teamsLists.forEach((teamsList) => {
      teamsList.addEventListener("dragover", handleDragOver);
      teamsList.addEventListener("dragenter", handleDragEnter);
      teamsList.addEventListener("dragleave", handleDragLeave);
      teamsList.addEventListener("drop", handleDrop);
    });
  }

  // Drag start handler
  function handleDragStart(e) {
    draggedTeam = this;

    // Set data transfer for Firefox compatibility
    e.dataTransfer.setData("text/plain", this.dataset.team);

    // Set effectAllowed to move
    e.dataTransfer.effectAllowed = "move";

    // Add dragging class for visual feedback
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  }

  // Drag end handler
  function handleDragEnd() {
    this.classList.remove("dragging");
    draggedTeam = null;

    // Remove drag-over class from all drop targets
    teamsLists.forEach((teamsList) => {
      teamsList.classList.remove("drag-over");
    });

    // Remove any placeholder
    if (draggedTeamPlaceholder) {
      draggedTeamPlaceholder.remove();
      draggedTeamPlaceholder = null;
    }
  }

  // Drag over handler
  function handleDragOver(e) {
    // Prevent default to allow drop
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Only show positioning during dragover, but don't actually move the element yet
    const afterElement = getDragAfterElement(this, e.clientY);

    // Remove any existing placeholder
    if (draggedTeamPlaceholder) {
      draggedTeamPlaceholder.remove();
    }

    // Create a placeholder to show where the item will be dropped
    draggedTeamPlaceholder = document.createElement("div");
    draggedTeamPlaceholder.classList.add("team-placeholder");
    draggedTeamPlaceholder.style.height = "2px";
    draggedTeamPlaceholder.style.backgroundColor = "#3498db";
    draggedTeamPlaceholder.style.margin = "10px 0";

    // Insert the placeholder at the appropriate position
    if (afterElement == null) {
      this.appendChild(draggedTeamPlaceholder);
    } else {
      this.insertBefore(draggedTeamPlaceholder, afterElement);
    }
  }

  // Drag enter handler
  function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add("drag-over");
  }

  // Drag leave handler
  function handleDragLeave() {
    this.classList.remove("drag-over");
  }

  // Drop handler
  function handleDrop(e) {
    e.preventDefault();

    // Remove drag-over class
    this.classList.remove("drag-over");

    // Remove placeholder
    if (draggedTeamPlaceholder) {
      draggedTeamPlaceholder.remove();
      draggedTeamPlaceholder = null;
    }

    // If no dragged team, exit
    if (!draggedTeam) return;

    // Check if we're dropping within the same tab
    const activeTab = document.querySelector(".tab-content.active");
    const dropTargetTab = this.closest(".tab-content");

    if (dropTargetTab !== activeTab) {
      // Don't allow dropping across tabs
      return;
    }

    // Get the class of the drop target
    const targetClass = this.dataset.class;

    // Get the position to insert the team
    const afterElement = getDragAfterElement(this, e.clientY);

    // Move the team to the new position
    if (afterElement == null) {
      this.appendChild(draggedTeam);
    } else {
      this.insertBefore(draggedTeam, afterElement);
    }

    // Update the team's parent container ID for proper styling
    const parentContainer = this.closest(".class-container");
    if (parentContainer) {
      // Update the team's visual style based on its new class
      updateTeamClass(draggedTeam, targetClass, parentContainer.id);
    }
  }

  // Helper function to determine where to insert the dragged element
  function getDragAfterElement(container, y) {
    // Get all team elements in the container that are not being dragged
    const draggableElements = [
      ...container.querySelectorAll(".team:not(.dragging)"),
    ];

    // Find the team element that comes after the dragged element based on mouse position
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        // If offset is negative but greater than closest, this is the new closest
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  // Helper function to update team's visual style based on its class
  function updateTeamClass(team, newClass, containerId) {
    // Remove all class-specific styles
    team.classList.remove("class-a-team", "class-b-team", "class-c-team");

    // Update the team's data-class attribute
    team.dataset.class = newClass;

    // We don't need to add specific classes since the styling is based on the parent container
    // The team will inherit styling from its new parent container
  }

  // Save button functionality could be added here
  // For example:
  // document.getElementById('save-button').addEventListener('click', saveTeamArrangement);

  // Function to save the current arrangement
  // function saveTeamArrangement() {
  //   const maleArrangement = {
  //     A: [...document.querySelector('#male-class-a .teams-list').querySelectorAll('.team')].map(team => team.dataset.team),
  //     B: [...document.querySelector('#male-class-b .teams-list').querySelectorAll('.team')].map(team => team.dataset.team),
  //     C: [...document.querySelector('#male-class-c .teams-list').querySelectorAll('.team')].map(team => team.dataset.team)
  //   };
  //
  //   const femaleArrangement = {
  //     A: [...document.querySelector('#female-class-a .teams-list').querySelectorAll('.team')].map(team => team.dataset.team),
  //     B: [...document.querySelector('#female-class-b .teams-list').querySelectorAll('.team')].map(team => team.dataset.team),
  //     C: [...document.querySelector('#female-class-c .teams-list').querySelectorAll('.team')].map(team => team.dataset.team)
  //   };
  //
  //   console.log('Male arrangement:', maleArrangement);
  //   console.log('Female arrangement:', femaleArrangement);
  //   // Here you could send this data to a server or save it to localStorage
  // }
});
