/**
 * U-AIX Application Controller
 * Handles interactive SPA routing, canvas layouts, node dragging, SVG connections,
 * pipeline executions, marketplace filters, and mock specifications sandboxes.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Navigation tabs
  initNavigation();

  // Agent Studio Canvas
  initAgentStudio();

  // Skill Marketplace
  initMarketplace();

  // Multi-Model Router
  initRouter();

  // Universal Memory Vector Sync
  initMemorySystem();

  // Architect Portal (API Specs, Database, SDK)
  initArchitectPortal();

  // Pitch Deck Carousel
  initPitchDeck();

  // System Wide Event Hooks
  initGlobalControls();

  // Real-time Telemetry Bootstrap
  updateGlobalTelemetryUI();
  renderRecentExecutions();
  initTelemetryTicker();
});

/* ==========================================================================
   GLOBAL APP SYSTEM STATE
   ========================================================================== */
const AppState = {
  activeTab: "tab-dashboard",
  nodes: [
    { id: "node-1", title: "ChatGPT", type: "model", x: 40, y: 120, outputs: ["node-1-out"] },
    { id: "node-2", title: "Research Pack", type: "skill", x: 330, y: 50, inputs: ["node-2-in"], outputs: ["node-2-out"] },
    { id: "node-3", title: "Claude", type: "model", x: 330, y: 220, inputs: ["node-3-in"], outputs: ["node-3-out"] },
    { id: "node-4", title: "Gemini", type: "model", x: 620, y: 130, inputs: ["node-4-in"], outputs: ["node-4-out"] }
  ],
  connections: [
    { from: "node-1-out", to: "node-2-in" },
    { from: "node-1-out", to: "node-3-in" },
    { from: "node-2-out", to: "node-4-in" },
    { from: "node-3-out", to: "node-4-in" }
  ],
  installedSkills: ["deep-search-pack"],
  routerSettings: {
    accuracy: 70,
    speed: 40,
    cost: 30
  },
  telemetry: {
    totalSavedCost: 12481.50,
    averageLatency: 180,
    activeWorkflows: 42,
    successRate: 99.84,
    totalExecutions: 4281
  },
  recentExecutions: [
    { name: "Research Pipeline #2301", flow: "Piped: ChatGPT → Claude → Gemini", cost: 0.024 },
    { name: "Code generation API endpoint", flow: "Piped: User input → DeepSeek → Validate", cost: 0.008 },
    { name: "Local Mistral Edge execution", flow: "Decentralized Llama/Mistral route", cost: 0.000 }
  ],
  apiSpecs: {
    "create-session": {
      title: "POST /sessions",
      desc: "Instantiate a new secure agent orchestration session with cross-platform memory sync.",
      params: [
        { name: "workspace_id", default: "ws_energy_research_01" },
        { name: "enable_memory", default: "true" }
      ],
      curl: `curl -X POST https://api.u-aix.com/v1/sessions \\
  -H "Authorization: Bearer $UAIX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"workspace_id": "ws_energy_research_01", "enable_memory": true}'`,
      mockResponse: {
        status: "created",
        session_id: "session_9a2f-e8b5-310d-c07a",
        created_at: "2026-06-22T20:00:00Z",
        zero_knowledge_sync: "enabled",
        active_memory_dimension: 1536
      }
    },
    "execute-step": {
      title: "POST /orchestrate/run",
      desc: "Execute a custom workflow pipeline or single model step with automatic fallback routing.",
      params: [
        { name: "session_id", default: "session_9a2f-e8b5-310d-c07a" },
        { name: "workflow_id", default: "wf_creative_synthesis_09" }
      ],
      curl: `curl -X POST https://api.u-aix.com/v1/orchestrate/run \\
  -H "Authorization: Bearer $UAIX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"session_id": "session_9a2f-e8b5-310d-c07a", "workflow_id": "wf_creative_synthesis_09"}'`,
      mockResponse: {
        task_id: "task_481a-92bc",
        status: "completed",
        steps_executed: 4,
        metrics: {
          execution_time_ms: 180,
          input_tokens: 3820,
          output_tokens: 1024,
          total_cost_usd: 0.024
        },
        payload_synthesis: "Superconducting REBCO Magnets research summary loaded successfully."
      }
    },
    "sync-context": {
      title: "PUT /memory/sync",
      desc: "Synchronize local vector embeddings into the cloud orchestrator using end-to-end user key verification.",
      params: [
        { name: "session_id", default: "session_9a2f-e8b5-310d-c07a" },
        { name: "checksum_hash", default: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
      ],
      curl: `curl -X PUT https://api.u-aix.com/v1/memory/sync \\
  -H "Authorization: Bearer $UAIX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"session_id": "session_9a2f-e8b5-310d-c07a", "checksum_hash": "e3b0c44298fc1c..."}'`,
      mockResponse: {
        status: "synchronized",
        synced_vectors_count: 42,
        active_workspace_id: "ws_energy_research_01",
        data_sovereignty_region: "EU-West (Frankfurt)",
        integrity_check: "verified"
      }
    },
    "list-skills": {
      title: "GET /skills",
      desc: "Query the marketplace for installed or discoverable AI skills within this developer account.",
      params: [
        { name: "category", default: "research" },
        { name: "limit", default: "10" }
      ],
      curl: `curl -X GET "https://api.u-aix.com/v1/skills?category=research&limit=10" \\
  -H "Authorization: Bearer $UAIX_API_KEY"`,
      mockResponse: [
        { id: "deep-research-pack", name: "Research Pack", version: "1.2.0", type: "core" },
        { id: "deep-search-pack", name: "Deep Search Pack", version: "1.1.2", type: "core" }
      ]
    }
  }
};

/* ==========================================================================
   ROUTING & TABS INITIALIZATION
   ========================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll("nav .nav-item");
  const views = document.querySelectorAll(".content-view");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTabId = item.getAttribute("data-tab");
      if (!targetTabId) return;

      // Update sidebar state
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // Update active view layout
      views.forEach((view) => view.classList.remove("active"));
      const targetView = document.getElementById(targetTabId);
      if (targetView) {
        targetView.classList.add("active");
        AppState.activeTab = targetTabId;
        logSecurity(`Switched console view to: ${targetTabId}`);
      }

      // Re-trigger layout calculations if needed
      if (targetTabId === "tab-studio") {
        drawConnections();
      } else if (targetTabId === "tab-memory") {
        drawMemoryLines();
      }
    });
  });
}

function logSecurity(message) {
  const feed = document.getElementById("security-log-feed");
  if (!feed) return;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const line = document.createElement("span");
  line.className = "console-line info";
  line.innerText = `[${time}] ${message}`;
  feed.appendChild(line);
  feed.scrollTop = feed.scrollHeight;
}

/* ==========================================================================
   INTERACTIVE AGENT STUDIO (DRAG & DROP CANVAS)
   ========================================================================== */
function initAgentStudio() {
  const canvas = document.getElementById("studio-canvas");
  const addModelBtn = document.getElementById("btn-add-node-model");
  const addSkillBtn = document.getElementById("btn-add-node-skill");
  const clearBtn = document.getElementById("btn-clear-canvas");
  const runBtn = document.getElementById("btn-run-studio-workflow");

  if (!canvas) return;

  // Make default nodes draggable
  AppState.nodes.forEach((node) => {
    makeDraggable(document.getElementById(node.id));
  });

  // Draw lines initial
  setTimeout(drawConnections, 100);

  // Add Model Node
  let nodeCount = 4;
  addModelBtn.addEventListener("click", () => {
    nodeCount++;
    const id = `node-${nodeCount}`;
    const x = 200 + Math.random() * 150;
    const y = 100 + Math.random() * 150;

    const nodeHtml = `
      <div class="studio-node" id="${id}" style="left: ${x}px; top: ${y}px;">
        <div class="node-header">
          <div class="node-header-icon icon-claude">C3</div>
          <div class="node-title">Custom Agent ${nodeCount}</div>
          <div class="node-type">Model</div>
        </div>
        <div class="node-content">
          <div class="node-param-row"><span class="node-param-label">Max Tokens:</span><span class="node-param-value">4096</span></div>
          <div class="node-param-row"><span class="node-param-label">Temp:</span><span class="node-param-value">0.5</span></div>
        </div>
        <div class="node-port port-input" data-port-id="${id}-in"></div>
        <div class="node-port port-output" data-port-id="${id}-out"></div>
      </div>
    `;

    canvas.insertAdjacentHTML("beforeend", nodeHtml);
    
    // Add to state
    AppState.nodes.push({
      id: id,
      title: `Custom Agent ${nodeCount}`,
      type: "model",
      x: x,
      y: y,
      inputs: [`${id}-in`],
      outputs: [`${id}-out`]
    });

    // Make new connection from Node 1 or Node 3 to this node
    if (AppState.nodes.length > 2) {
      AppState.connections.push({
        from: "node-1-out",
        to: `${id}-in`
      });
      AppState.connections.push({
        from: `${id}-out`,
        to: "node-4-in"
      });
    }

    makeDraggable(document.getElementById(id));
    drawConnections();
    logSecurity(`Created custom model node: ${id}`);
  });

  // Add Skill Node
  addSkillBtn.addEventListener("click", () => {
    nodeCount++;
    const id = `node-${nodeCount}`;
    const x = 200 + Math.random() * 150;
    const y = 100 + Math.random() * 150;

    const nodeHtml = `
      <div class="studio-node" id="${id}" style="left: ${x}px; top: ${y}px;">
        <div class="node-header">
          <div class="node-header-icon icon-skill">SK</div>
          <div class="node-title">Custom Skill ${nodeCount}</div>
          <div class="node-type">Skill</div>
        </div>
        <div class="node-content">
          <div class="node-param-row"><span class="node-param-label">Access:</span><span class="node-param-value">Local Sandbox</span></div>
          <div class="node-param-row"><span class="node-param-label">SDK:</span><span class="node-param-value">JS/Python</span></div>
        </div>
        <div class="node-port port-input" data-port-id="${id}-in"></div>
        <div class="node-port port-output" data-port-id="${id}-out"></div>
      </div>
    `;

    canvas.insertAdjacentHTML("beforeend", nodeHtml);
    
    AppState.nodes.push({
      id: id,
      title: `Custom Skill ${nodeCount}`,
      type: "skill",
      x: x,
      y: y,
      inputs: [`${id}-in`],
      outputs: [`${id}-out`]
    });

    if (AppState.nodes.length > 2) {
      AppState.connections.push({
        from: "node-1-out",
        to: `${id}-in`
      });
      AppState.connections.push({
        from: `${id}-out`,
        to: "node-4-in"
      });
    }

    makeDraggable(document.getElementById(id));
    drawConnections();
    logSecurity(`Created custom skill node: ${id}`);
  });

  // Clear Canvas
  clearBtn.addEventListener("click", () => {
    const defaultIds = ["node-1", "node-2", "node-3", "node-4"];
    const nodes = canvas.querySelectorAll(".studio-node");
    nodes.forEach((node) => {
      if (!defaultIds.includes(node.id)) {
        node.remove();
      }
    });

    // Reset state
    AppState.nodes = AppState.nodes.slice(0, 4);
    AppState.connections = [
      { from: "node-1-out", to: "node-2-in" },
      { from: "node-1-out", to: "node-3-in" },
      { from: "node-2-out", to: "node-4-in" },
      { from: "node-3-out", to: "node-4-in" }
    ];

    drawConnections();
    logSecurity("Reset Agent Studio canvas to default workflow layout.");
  });

  // Drag & drop logic
  function makeDraggable(element) {
    if (!element) return;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector(".node-header");

    if (header) {
      header.onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      const newTop = element.offsetTop - pos2;
      const newLeft = element.offsetLeft - pos1;

      element.style.top = `${newTop}px`;
      element.style.left = `${newLeft}px`;

      // Update state coords
      const nodeState = AppState.nodes.find((n) => n.id === element.id);
      if (nodeState) {
        nodeState.x = newLeft;
        nodeState.y = newTop;
      }

      drawConnections();
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Draw lines function
  function drawConnections() {
    const svg = document.getElementById("connections-svg");
    if (!svg) return;
    svg.innerHTML = "";

    AppState.connections.forEach((conn) => {
      const fromPort = document.querySelector(`[data-port-id="${conn.from}"]`);
      const toPort = document.querySelector(`[data-port-id="${conn.to}"]`);

      if (!fromPort || !toPort) return;

      const fromRect = fromPort.getBoundingClientRect();
      const toRect = toPort.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      // Relative to workspace canvas scroll
      const fromX = fromRect.left - canvasRect.left + fromRect.width / 2;
      const fromY = fromRect.top - canvasRect.top + fromRect.height / 2;
      const toX = toRect.left - canvasRect.left + toRect.width / 2;
      const toY = toRect.top - canvasRect.top + toRect.height / 2;

      // Draw bezier curves
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const controlDist = Math.abs(toX - fromX) * 0.5;
      const d = `M ${fromX} ${fromY} C ${fromX + controlDist} ${fromY}, ${toX - controlDist} ${toY}, ${toX} ${toY}`;

      path.setAttribute("d", d);
      path.setAttribute("class", "connection-line");
      path.setAttribute("id", `conn-${conn.from}-${conn.to}`);
      svg.appendChild(path);
    });
  }

  // Store drawConnections globally so it can be called on nav switches
  window.drawConnections = drawConnections;

  // Run Workflow animation simulation
  runBtn.addEventListener("click", () => {
    executeWorkflowSimulation();
  });
}

function executeWorkflowSimulation() {
  const terminal = document.getElementById("studio-terminal");
  const outputBox = document.getElementById("studio-output");
  if (!terminal || !outputBox) return;

  terminal.innerHTML = "";
  outputBox.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Executing pipeline orchestration, please wait...</span>`;
  
  // Update telemetry for active workflows
  AppState.telemetry.activeWorkflows += 1;
  updateGlobalTelemetryUI();

  // Highlight connection routes and nodes in steps
  const steps = [
    {
      nodeId: "node-1",
      log: "[Router] Prompt complexity calculated. Pipelining execution paths...",
      delay: 500,
      class: "command"
    },
    {
      nodeId: "node-1",
      log: "[Router] Delegating Subtask 1: 'Gather Web Progress Core Data' to Research Pack.",
      delay: 1000,
      class: "info"
    },
    {
      nodeId: "node-2",
      log: "[Research Pack] Deep Scraper running on 14 targets (arxiv.org, physics.mit.edu...)",
      delay: 1800,
      class: "success"
    },
    {
      nodeId: "node-2",
      log: "[Research Pack] Found key citation: 'REBCO Superconductors in High-Field Tokamak' - 2026 Breakthrough.",
      delay: 2400,
      class: "success"
    },
    {
      nodeId: "node-1",
      log: "[Router] Delegating Subtask 2: 'Synthesize Refinement Analysis' to Claude 3.5 Sonnet.",
      delay: 3000,
      class: "info"
    },
    {
      nodeId: "node-3",
      log: "[Claude] Compiling findings... Context synced successfully from Research Pack. (1536 dimension vector).",
      delay: 3600,
      class: "info"
    },
    {
      nodeId: "node-3",
      log: "[Claude] Performing revenue validation, startup scaling milestones checklist.",
      delay: 4200,
      class: "success"
    },
    {
      nodeId: "node-4",
      log: "[Gemini] Output fusion engine running. Merging Claude copy with custom visualization graphs.",
      delay: 4800,
      class: "info"
    },
    {
      nodeId: "node-4",
      log: "[System] Zero-knowledge session synchronization complete. Saved $0.18 vs single OpenAI execution.",
      delay: 5400,
      class: "success"
    }
  ];

  // Remove styling indicators
  document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));
  document.querySelectorAll(".connection-line").forEach((c) => {
    c.classList.remove("active");
    c.classList.remove("executing");
  });

  steps.forEach((step, idx) => {
    setTimeout(() => {
      // Log to terminal
      const line = document.createElement("span");
      line.className = `console-line ${step.class}`;
      line.innerText = step.log;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;

      // Update Node highlighted state
      document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));
      const nodeEl = document.getElementById(step.nodeId);
      if (nodeEl) nodeEl.classList.add("active-executing");

      // Highlight connections outgoing/incoming from active node
      document.querySelectorAll(".connection-line").forEach((c) => {
        c.classList.remove("executing");
      });
      AppState.connections.forEach((conn) => {
        if (conn.from.startsWith(step.nodeId) || conn.to.startsWith(step.nodeId)) {
          const lineEl = document.getElementById(`conn-${conn.from}-${conn.to}`);
          if (lineEl) lineEl.classList.add("executing");
        }
      });

      // Final complete step
      if (idx === steps.length - 1) {
        setTimeout(() => {
          document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));
          document.querySelectorAll(".connection-line").forEach((c) => c.classList.remove("executing"));
          
          // Decrement active workflow
          AppState.telemetry.activeWorkflows = Math.max(0, AppState.telemetry.activeWorkflows - 1);

          // Calculate execution cost based on current router settings
          const { accuracy, speed, cost } = AppState.routerSettings;
          const calculatedCost = Math.max(0.000, parseFloat((0.005 + (accuracy * 0.0005) - (cost * 0.00015)).toFixed(4)));
          
          // Savings = baseline OpenAI call ($0.18) - optimized cost
          const savings = Math.max(0, 0.180 - calculatedCost);

          AppState.telemetry.totalSavedCost += savings;
          AppState.telemetry.totalExecutions += 1;

          // Push execution to dashboard listing
          AppState.recentExecutions.unshift({
            name: "Research Pipeline (Studio Run)",
            flow: "Piped: ChatGPT → Claude → Gemini",
            cost: calculatedCost
          });
          if (AppState.recentExecutions.length > 5) {
            AppState.recentExecutions.pop();
          }

          // Trigger telemetry UI refresh
          updateGlobalTelemetryUI();
          renderRecentExecutions();

          // Load final visual dashboard output in output container
          outputBox.innerHTML = `
            <div style="border-left: 3px solid var(--accent-primary); padding-left: 12px;">
              <h4 style="font-weight: 700; color: #fff; margin-bottom: 8px;">U-AIX Fusion Result: 2026 Fusion Advancement</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                Our multi-agent consensus pipeline successfully synthesized research from 14 source citations into an actionable investor memo:
              </p>
              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <div style="background: var(--bg-dark); padding: 8px; border-radius: 4px; flex-grow: 1; text-align: center;">
                  <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Breakeven Q-Factor</span>
                  <div style="font-size: 1.1rem; font-weight: bold; color: var(--accent-success);">Q = 1.25x</div>
                </div>
                <div style="background: var(--bg-dark); padding: 8px; border-radius: 4px; flex-grow: 1; text-align: center;">
                  <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Refinement Pipeline Cost</span>
                  <div style="font-size: 1.1rem; font-weight: bold; color: var(--accent-secondary);">$${calculatedCost.toFixed(3)}</div>
                </div>
              </div>
              <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">✓ Synced to Central Memory vector node.</span>
            </div>
          `;
          logSecurity("Workflow A execution finished successfully. Output generated.");
        }, 600);
      }
    }, step.delay);
  });
}

/* ==========================================================================
   UNIVERSAL SKILL MARKETPLACE
   ========================================================================== */
function initMarketplace() {
  const catTabs = document.querySelectorAll(".category-tab");
  const cards = document.querySelectorAll(".skill-card");
  const countBadge = document.getElementById("marketplace-count");
  const installButtons = document.querySelectorAll(".btn-install");

  if (catTabs.length === 0) return;

  // Filters catalog cards
  catTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      catTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const cat = tab.getAttribute("data-category");
      let count = 0;

      cards.forEach((card) => {
        const cardCat = card.getAttribute("data-cat");
        if (cat === "all" || cardCat === cat) {
          card.style.display = "flex";
          count++;
        } else {
          card.style.display = "none";
        }
      });

      if (countBadge) countBadge.innerText = count;
    });
  });

  // Interactive install simulation
  installButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("installed")) return;

      const skillId = btn.getAttribute("data-id");
      btn.innerText = "Installing...";
      btn.style.opacity = "0.7";

      setTimeout(() => {
        btn.innerText = "Installed";
        btn.style.opacity = "1";
        btn.classList.add("installed");
        
        // Add to global state
        AppState.installedSkills.push(skillId);
        logSecurity(`Installed marketplace skill: ${skillId}`);
      }, 1000);
    });
  });
}

/* ==========================================================================
   MULTI-MODEL ROUTER & INTELLIGENCE DIALS
   ========================================================================== */
function initRouter() {
  const sliderAccuracy = document.getElementById("slider-accuracy");
  const sliderSpeed = document.getElementById("slider-speed");
  const sliderCost = document.getElementById("slider-cost");

  if (!sliderAccuracy) return;

  // Update text label and recompute values on change
  [sliderAccuracy, sliderSpeed, sliderCost].forEach((slider) => {
    slider.addEventListener("input", () => {
      const valSpan = document.getElementById(`${slider.id}-val`);
      if (valSpan) valSpan.innerText = `${slider.value}%`;

      AppState.routerSettings.accuracy = parseInt(sliderAccuracy.value);
      AppState.routerSettings.speed = parseInt(sliderSpeed.value);
      AppState.routerSettings.cost = parseInt(sliderCost.value);

      recalculateRoutingRecommendations();
    });
  });

  // Run initial calculation load
  recalculateRoutingRecommendations();
}

function recalculateRoutingRecommendations() {
  const recommendationsList = document.getElementById("router-recommendation-list");
  const gaugeAccuracyText = document.getElementById("gauge-accuracy-text");
  const gaugeSpeedText = document.getElementById("gauge-speed-text");
  const gaugeCostText = document.getElementById("gauge-cost-text");
  const ringCost = document.querySelector(".ring-cost");
  const ringSpeed = document.querySelector(".ring-speed");
  const ringAccuracy = document.querySelector(".ring-accuracy");
  const routingSummaryText = document.getElementById("routing-summary-paragraph");

  if (!recommendationsList) return;

  const { accuracy, speed, cost } = AppState.routerSettings;

  // Dynamically calculate average system telemetry metrics based on active weights
  const accuracyScore = Math.min(100, Math.round(50 + accuracy * 0.5));
  const calculatedLatency = Math.max(80, Math.round(500 - (speed * 4)));
  const calculatedCost = Math.max(0.000, parseFloat((0.005 + (accuracy * 0.0005) - (cost * 0.00015)).toFixed(4)));

  // Update Dial Visualizers
  if (gaugeAccuracyText) gaugeAccuracyText.innerText = `${accuracyScore}%`;
  if (gaugeSpeedText) gaugeSpeedText.innerText = `${calculatedLatency}ms`;
  if (gaugeCostText) gaugeCostText.innerText = `$${calculatedCost}`;

  // Update Circle Dash Offsets (SVG ring bounds: radius=32, circumference ~ 201)
  if (ringAccuracy) ringAccuracy.style.strokeDashoffset = 201 - (201 * (accuracyScore / 100));
  if (ringSpeed) ringSpeed.style.strokeDashoffset = 201 - (201 * ((500 - calculatedLatency) / 500));
  if (ringCost) ringCost.style.strokeDashoffset = 201 - (201 * (Math.min(1, calculatedCost / 0.04)));

  // Define models available
  const models = [
    { name: "Claude 3.5 Sonnet", cost: 0.015, speed: 220, quality: 95, desc: "Best for complex research, reasoning, code structural design.", commercial: true },
    { name: "Gemini 1.5 Pro", cost: 0.007, speed: 180, quality: 92, desc: "Best for massive context analysis, multimodal logic, charts visualization.", commercial: true },
    { name: "DeepSeek-V3", cost: 0.002, speed: 120, quality: 89, desc: "Excellent accuracy vs cost compromise. High-velocity processing.", commercial: true },
    { name: "Mistral-7B (Local Edge)", cost: 0.000, speed: 90, quality: 72, desc: "Runs locally via WebAssembly/Tauri. 100% free, offline, secure.", commercial: false }
  ];

  // Grade them based on slider focus
  let recommendedModel = models[0];
  let highestScore = -9999;

  const rankedModels = models.map((m) => {
    // Score algorithm: weight inputs * model outputs
    const score = (accuracy * m.quality * 0.01) + (speed * (500 - m.speed) * 0.01) - (cost * m.cost * 1000 * 0.01);
    if (score > highestScore) {
      highestScore = score;
      recommendedModel = m;
    }
    return { ...m, score };
  });

  // Render model list
  recommendationsList.innerHTML = rankedModels.map((m) => {
    const isRec = m.name === recommendedModel.name;
    return `
      <div class="compare-card ${isRec ? 'active-route' : ''}">
        <div class="compare-title">${m.name}</div>
        <div class="compare-metrics">
          <span>Cost/1k: <strong>$${m.cost}</strong></span>
          <span>Avg Speed: <strong>${m.speed}ms</strong></span>
          <span>Quality Rating: <strong>${m.quality}%</strong></span>
          <span style="margin-top: 6px; color: var(--text-muted); font-size: 0.7rem; line-height: 1.3;">${m.desc}</span>
        </div>
      </div>
    `;
  }).join("");

  // Update summary paragraph
  if (routingSummaryText) {
    if (recommendedModel.name.includes("Local")) {
      routingSummaryText.innerText = "Under current budget constraints, the router selects zero-cost local LLM edge compilation. Complex reasoning will be compressed, but execution costs will remain completely free.";
    } else {
      routingSummaryText.innerText = `To achieve optimal results, the U-AIX Intelligent Middleware selects ${recommendedModel.name} as the primary route for incoming queries, offering the ideal balance of accuracy, cost ($${recommendedModel.cost}), and processing latency.`;
    }
  }
}

/* ==========================================================================
   UNIVERSAL MEMORY GRAPH SYSTEM
   ========================================================================== */
function initMemorySystem() {
  const syncBtn = document.getElementById("btn-sync-mem-now");
  if (!syncBtn) return;

  // Position and draw SVG lines connecting memory nodes
  setTimeout(drawMemoryLines, 200);

  syncBtn.addEventListener("click", () => {
    syncBtn.innerText = "Syncing Vector Hub...";
    syncBtn.classList.add("btn-outline");
    syncBtn.classList.remove("btn-primary");
    logSecurity("Cross-platform memory sync triggered. Recalculating user embeddings.");

    // Pulse node styling
    const nodes = document.querySelectorAll(".memory-node");
    nodes.forEach((n) => {
      n.style.boxShadow = "0 0 20px var(--accent-secondary)";
      n.style.borderColor = "var(--accent-primary)";
    });

    const lines = document.querySelectorAll(".memory-conn-line");
    lines.forEach((l) => {
      l.setAttribute("stroke", "var(--accent-primary)");
      l.setAttribute("stroke-width", "4");
    });

    setTimeout(() => {
      nodes.forEach((n) => {
        n.style.boxShadow = "";
        n.style.borderColor = "";
      });
      lines.forEach((l) => {
        l.setAttribute("stroke", "var(--accent-secondary)");
        l.setAttribute("stroke-width", "2");
      });
      syncBtn.innerText = "Sync Memory Cross-Platform";
      syncBtn.classList.remove("btn-outline");
      syncBtn.classList.add("btn-primary");
      logSecurity("Memory synced successfully across 5 vector endpoints. TLS verification check: OK.");
    }, 1500);
  });
}

function drawMemoryLines() {
  const svg = document.getElementById("memory-lines-svg");
  const canvas = document.getElementById("memory-graph-canvas");
  if (!svg || !canvas) return;

  svg.innerHTML = "";

  const core = document.getElementById("mem-core");
  const others = ["mem-openai", "mem-claude", "mem-gemini", "mem-local"];

  if (!core) return;
  const coreRect = core.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  const coreX = coreRect.left - canvasRect.left + coreRect.width / 2;
  const coreY = coreRect.top - canvasRect.top + coreRect.height / 2;

  others.forEach((otherId) => {
    const el = document.getElementById(otherId);
    if (!el) return;
    const elRect = el.getBoundingClientRect();

    const elX = elRect.left - canvasRect.left + elRect.width / 2;
    const elY = elRect.top - canvasRect.top + elRect.height / 2;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", coreX);
    line.setAttribute("y1", coreY);
    line.setAttribute("x2", elX);
    line.setAttribute("y2", elY);
    line.setAttribute("stroke", "var(--accent-secondary)");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", "4,4");
    line.setAttribute("class", "memory-conn-line");

    svg.appendChild(line);
  });
}

window.drawMemoryLines = drawMemoryLines;

/* ==========================================================================
   ARCHITECT PORTAL (SUB-TABS, API SANDBOX, SDK HIGH-LIGHTER)
   ========================================================================== */
function initArchitectPortal() {
  const subTabs = document.querySelectorAll(".arch-tab");
  const subViews = document.querySelectorAll(".arch-view-content");

  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      subTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const targetId = tab.getAttribute("data-subtab");
      subViews.forEach((view) => view.classList.remove("active"));
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");
      
      logSecurity(`Architect view changed sub-tab to: ${targetId}`);
    });
  });

  // API specs sandbox logic
  const endpoints = document.querySelectorAll(".endpoint-item");
  const detailsBox = document.getElementById("api-sandbox-details");

  if (endpoints.length > 0) {
    // Select default endpoint
    loadApiSandbox("create-session");

    endpoints.forEach((ep) => {
      ep.addEventListener("click", () => {
        endpoints.forEach((item) => item.classList.remove("active"));
        ep.classList.add("active");

        const endpointId = ep.getAttribute("data-ep");
        loadApiSandbox(endpointId);
      });
    });
  }

  // SDK samples logic
  const sdkButtons = document.querySelectorAll(".sdk-lang-btn");
  const sdkCodeBox = document.getElementById("sdk-code-box");
  const sdkTitle = document.getElementById("sdk-code-title");
  const sdkBadge = document.getElementById("sdk-code-lang-badge");

  if (sdkButtons.length > 0) {
    loadSdkSample("javascript");

    sdkButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sdkButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const lang = btn.getAttribute("data-lang");
        loadSdkSample(lang);
      });
    });
  }

  function loadSdkSample(lang) {
    if (!sdkCodeBox || !SDK_SAMPLES[lang]) return;

    sdkCodeBox.innerText = SDK_SAMPLES[lang].code;
    sdkTitle.innerText = SDK_SAMPLES[lang].title;
    sdkBadge.innerText = SDK_SAMPLES[lang].lang;
  }
}

function loadApiSandbox(endpointId) {
  const container = document.getElementById("api-sandbox-details");
  if (!container || !AppState.apiSpecs[endpointId]) return;

  const spec = AppState.apiSpecs[endpointId];

  container.innerHTML = `
    <div class="api-card-header">
      <div class="api-card-title">${spec.title}</div>
      <div class="api-card-desc">${spec.desc}</div>
    </div>
    
    <div class="sandbox-split">
      <div class="sandbox-params">
        <h4>Request Parameters</h4>
        <div class="param-input-group">
          ${spec.params.map(p => `
            <div class="param-field">
              <label>${p.name}</label>
              <input type="text" id="api-param-${p.name}" value="${p.default}">
            </div>
          `).join("")}
          <button class="btn-primary" id="btn-api-send-sandbox" style="margin-top: 14px; width: fit-content;">
            Send Mock Request
          </button>
        </div>
      </div>

      <div class="sandbox-response">
        <h4>Response Payload</h4>
        <pre class="code-pre-box" id="api-sandbox-response-pre" style="white-space: pre-wrap; font-size: 0.7rem;">
${spec.curl}

// Click Send Request to execute simulation...
        </pre>
      </div>
    </div>
  `;

  // Attach button execution trigger
  document.getElementById("btn-api-send-sandbox").addEventListener("click", () => {
    const responseBox = document.getElementById("api-sandbox-response-pre");
    responseBox.innerText = "Connecting secure channel...\nEncrypting zero-trust variables...\nLoading response payload...";

    setTimeout(() => {
      responseBox.innerText = JSON.stringify(spec.mockResponse, null, 2);
      logSecurity(`Mock API endpoint hit: ${spec.title}`);
    }, 800);
  });
}

/* ==========================================================================
   PITCH & BUSINESS DECK CAROUSEL
   ========================================================================== */
function initPitchDeck() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dotsWrapper = document.getElementById("carousel-dots-wrapper");
  const prevBtn = document.getElementById("btn-prev-slide");
  const nextBtn = document.getElementById("btn-next-slide");

  if (slides.length === 0) return;

  let activeIndex = 0;

  // Generate dots dynamically
  dotsWrapper.innerHTML = "";
  slides.forEach((slide, idx) => {
    const dot = document.createElement("div");
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener("click", () => showSlide(idx));
    dotsWrapper.appendChild(dot);
  });

  const dots = dotsWrapper.querySelectorAll(".dot");

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      dots[idx].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    activeIndex = index;

    logSecurity(`Pitch deck navigation: Slide ${index + 1} of ${slides.length}`);
  }

  prevBtn.addEventListener("click", () => showSlide(activeIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(activeIndex + 1));
}

/* ==========================================================================
   GLOBAL APP BUTTON SYSTEM HOOKS
   ========================================================================== */
function initGlobalControls() {
  const globalRunBtn = document.getElementById("btn-global-compile");

  if (globalRunBtn) {
    globalRunBtn.addEventListener("click", () => {
      // Force switch to studio tab and run simulation
      const studioTabBtn = document.querySelector('[data-tab="tab-studio"]');
      if (studioTabBtn) {
        studioTabBtn.click();
        setTimeout(executeWorkflowSimulation, 400);
      }
    });
  }
}

/* ==========================================================================
   REAL-TIME TELEMETRY DATA PIPELINE
   ========================================================================== */
function updateGlobalTelemetryUI() {
  const headerSavings = document.getElementById("header-savings");
  const headerLatency = document.getElementById("header-latency");
  const dashActive = document.getElementById("dash-active-workflows");
  const dashLatency = document.getElementById("dash-latency");
  const dashSuccess = document.getElementById("dash-success-rate");
  const dashExecutions = document.getElementById("dash-total-executions");
  const dashSavedCost = document.getElementById("dash-saved-cost");

  if (headerSavings) headerSavings.innerText = `$${AppState.telemetry.totalSavedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (headerLatency) headerLatency.innerText = `${AppState.telemetry.averageLatency}ms`;
  if (dashActive) dashActive.innerText = AppState.telemetry.activeWorkflows;
  if (dashLatency) dashLatency.innerText = `${AppState.telemetry.averageLatency} ms`;
  if (dashSuccess) dashSuccess.innerText = `${AppState.telemetry.successRate}%`;
  if (dashExecutions) dashExecutions.innerText = `${AppState.telemetry.totalExecutions.toLocaleString()} executions today`;
  if (dashSavedCost) dashSavedCost.innerText = `$${AppState.telemetry.totalSavedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function renderRecentExecutions() {
  const container = document.getElementById("dashboard-recent-executions");
  if (!container) return;

  container.innerHTML = AppState.recentExecutions.map(exec => `
    <div style="display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; animation: fade-in 0.3s ease-out;">
      <div style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--accent-success);"></div>
      <div style="flex-grow: 1;">
        <div style="font-size: 0.85rem; font-weight: 500;">${exec.name}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${exec.flow}</div>
      </div>
      <div style="font-size: 0.75rem; color: var(--accent-success); font-weight: 600;">$${exec.cost.toFixed(3)}</div>
    </div>
  `).join("");
}

function initTelemetryTicker() {
  // Live ticker loop simulating dynamic client requests and chart updates
  setInterval(() => {
    // 1. Fluctuates general latency indicators slightly (175ms - 188ms)
    const latencyDelta = Math.random() > 0.5 ? 1 : -1;
    AppState.telemetry.averageLatency = Math.min(188, Math.max(175, AppState.telemetry.averageLatency + latencyDelta));

    // 2. Increments background execution counter
    AppState.telemetry.totalExecutions += Math.floor(Math.random() * 2);

    // 3. Fluctuates active chart heights to make dashboard look alive
    const chartBars = document.getElementById("telemetry-bar-chart").querySelectorAll("div");
    if (chartBars.length > 0) {
      const targetBar = chartBars[Math.floor(Math.random() * chartBars.length)];
      if (targetBar) {
        // Read current height percentage
        let curHeight = parseInt(targetBar.style.height);
        if (isNaN(curHeight)) curHeight = 50;
        const heightDelta = Math.random() > 0.5 ? 2 : -2;
        const newHeight = Math.min(98, Math.max(20, curHeight + heightDelta));
        targetBar.style.height = `${newHeight}%`;
        // Update label text in bar
        const kVal = Math.round(newHeight * 0.5);
        targetBar.innerText = `${kVal}k`;
      }
    }

    // 4. Occasional automated query arriving in back-channel pipeline (15% chance)
    if (Math.random() < 0.15 && AppState.telemetry.activeWorkflows === 0) {
      const mockQueries = [
        { name: "Market Intelligence Scan", flow: "Piped: Gemini → Local Edge", cost: 0.004 },
        { name: "Code Lint Verification", flow: "Piped: DeepSeek → Linter", cost: 0.002 },
        { name: "Automation Webhook Handler", flow: "Piped: Router → Claude 3.5", cost: 0.015 },
        { name: "Translation Synthesis Pipeline", flow: "Piped: ChatGPT → Mistral-7B", cost: 0.008 }
      ];

      const query = mockQueries[Math.floor(Math.random() * mockQueries.length)];
      const savings = Math.max(0, 0.180 - query.cost);

      AppState.telemetry.totalSavedCost += savings;
      AppState.recentExecutions.unshift(query);
      if (AppState.recentExecutions.length > 5) {
        AppState.recentExecutions.pop();
      }

      // Log context to central security panel
      logSecurity(`Pipeline Sync: Automatically routed query '${query.name}' to optimized channel. Saved $${savings.toFixed(3)}.`);
      renderRecentExecutions();
    }

    // Push state metrics to DOM elements
    updateGlobalTelemetryUI();
  }, 3500);
}

