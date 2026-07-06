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

  // Custom Theme Selector Engine
  initThemeEngine();

  // Autonomous Venture Incubator
  initIncubator();

  // Model Route Arena Playground
  initArena();

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

  function makeDraggable(element) {
    if (!element) return;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.addEventListener("click", (e) => {
      if (e.target.classList.contains("node-port")) return;
      selectNode(element.id);
    });

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

/* ==========================================================================
   CONSOLE CUSTOM THEMES ENGINE
   ========================================================================== */
function initThemeEngine() {
  const themeBtns = document.querySelectorAll(".theme-btn");
  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      themeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      
      const theme = btn.getAttribute("data-theme");
      document.body.className = "";
      if (theme !== "quantum") {
        document.body.classList.add(`theme-${theme}`);
      }
      
      logSecurity(`Console theme updated to: ${theme}`);
      
      // Re-trigger visual canvas connection lines redrawing
      if (typeof drawConnections === "function") {
        drawConnections();
      }
      if (typeof drawMemoryLines === "function") {
        drawMemoryLines();
      }
    });
  });
}

/* ==========================================================================
   NODE PARAMETER INSPECTOR CONTROLS
   ========================================================================== */
function selectNode(nodeId) {
  const node = AppState.nodes.find(n => n.id === nodeId);
  if (!node) return;

  const inspectorCard = document.getElementById("studio-inspector-card");
  const inspectorTitle = document.getElementById("inspector-node-title");
  const formContainer = document.getElementById("inspector-form-container");
  const closeBtn = document.getElementById("btn-close-inspector");

  if (!inspectorCard) return;

  // Add active selected styling
  document.querySelectorAll(".studio-node").forEach(el => el.classList.remove("selected-node"));
  const nodeEl = document.getElementById(nodeId);
  if (nodeEl) nodeEl.classList.add("selected-node");

  inspectorCard.style.display = "flex";
  inspectorTitle.innerText = node.title;

  let formHtml = "";

  if (node.type === "model") {
    const temp = node.temp !== undefined ? node.temp : 0.7;
    const maxTokens = node.maxTokens !== undefined ? node.maxTokens : 2048;
    const strategy = node.strategy || "accuracy";
    formHtml = `
      <div class="param-field" style="display:flex; flex-direction:column; gap:4px;">
        <label style="font-size: 0.75rem; color: var(--text-muted);">Temperature (Creativity)</label>
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="range" class="custom-range-slider" id="inp-node-temp" min="0" max="1" step="0.1" value="${temp}" style="flex-grow:1;">
          <span id="lbl-node-temp" style="font-weight: bold; width: 30px; font-size: 0.85rem; color:var(--accent-secondary);">${temp}</span>
        </div>
      </div>
      <div class="param-field" style="display:flex; flex-direction:column; gap:4px;">
        <label style="font-size: 0.75rem; color: var(--text-muted);">Max Output Tokens</label>
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="range" class="custom-range-slider" id="inp-node-tokens" min="256" max="8192" step="256" value="${maxTokens}" style="flex-grow:1;">
          <span id="lbl-node-tokens" style="font-weight: bold; font-size: 0.85rem; color:var(--accent-secondary);">${maxTokens}</span>
        </div>
      </div>
      <div class="param-field" style="display:flex; flex-direction:column; gap:4px;">
        <label style="font-size: 0.75rem; color: var(--text-muted);">Routing Strategy Target</label>
        <select id="inp-node-strategy" style="background: var(--bg-darker); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); color: var(--text-primary); outline: none; font-size: 0.8rem;">
          <option value="accuracy" ${strategy === 'accuracy' ? 'selected' : ''}>Accuracy (High Precision)</option>
          <option value="latency" ${strategy === 'latency' ? 'selected' : ''}>Latency (Fast Response)</option>
          <option value="cost" ${strategy === 'cost' ? 'selected' : ''}>Cost Optimized (Free/Edge)</option>
        </select>
      </div>
    `;
  } else {
    const sources = node.sources || "Web, PDF";
    const depth = node.depth || "Medium";
    formHtml = `
      <div class="param-field" style="display:flex; flex-direction:column; gap:4px;">
        <label style="font-size: 0.75rem; color: var(--text-muted);">Data Access Sources</label>
        <input type="text" id="inp-node-sources" value="${sources}" style="background: var(--bg-darker); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); color: var(--text-primary); outline: none; font-size: 0.85rem;">
      </div>
      <div class="param-field" style="display:flex; flex-direction:column; gap:4px;">
        <label style="font-size: 0.75rem; color: var(--text-muted);">Skill Execution Depth</label>
        <select id="inp-node-depth" style="background: var(--bg-darker); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); color: var(--text-primary); outline: none; font-size: 0.8rem;">
          <option value="Low" ${depth === 'Low' ? 'selected' : ''}>Low (Fast scan)</option>
          <option value="Medium" ${depth === 'Medium' ? 'selected' : ''}>Medium (Standard)</option>
          <option value="Aggressive" ${depth === 'Aggressive' ? 'selected' : ''}>Aggressive (Deep crawl)</option>
        </select>
      </div>
    `;
  }

  formContainer.innerHTML = formHtml;

  // Setup close listener
  closeBtn.onclick = () => {
    inspectorCard.style.display = "none";
    document.querySelectorAll(".studio-node").forEach(el => el.classList.remove("selected-node"));
  };

  // Add event listeners to immediately sync parameters
  if (node.type === "model") {
    const tempInput = document.getElementById("inp-node-temp");
    const tokensInput = document.getElementById("inp-node-tokens");
    const strategyInput = document.getElementById("inp-node-strategy");

    tempInput.addEventListener("input", () => {
      document.getElementById("lbl-node-temp").innerText = tempInput.value;
      node.temp = parseFloat(tempInput.value);
      updateNodeUIParams(nodeId, "Temp", tempInput.value);
    });

    tokensInput.addEventListener("input", () => {
      document.getElementById("lbl-node-tokens").innerText = tokensInput.value;
      node.maxTokens = parseInt(tokensInput.value);
      updateNodeUIParams(nodeId, "Max Tokens", tokensInput.value);
    });

    strategyInput.addEventListener("change", () => {
      node.strategy = strategyInput.value;
      updateNodeUIParams(nodeId, "Strategy", strategyInput.value);
      logSecurity(`Updated strategy parameters of ${node.title} to: ${strategyInput.value}`);
    });
  } else {
    const sourcesInput = document.getElementById("inp-node-sources");
    const depthInput = document.getElementById("inp-node-depth");

    sourcesInput.addEventListener("input", () => {
      node.sources = sourcesInput.value;
      updateNodeUIParams(nodeId, "Sources", sourcesInput.value);
    });

    depthInput.addEventListener("change", () => {
      node.depth = depthInput.value;
      updateNodeUIParams(nodeId, "Depth", depthInput.value);
      logSecurity(`Updated depth parameters of ${node.title} to: ${depthInput.value}`);
    });
  }
}

function updateNodeUIParams(nodeId, label, value) {
  const nodeEl = document.getElementById(nodeId);
  if (!nodeEl) return;
  const paramRows = nodeEl.querySelectorAll(".node-param-row");
  paramRows.forEach(row => {
    const labelSpan = row.querySelector(".node-param-label");
    if (labelSpan && labelSpan.innerText.toLowerCase().startsWith(label.toLowerCase())) {
      const valSpan = row.querySelector(".node-param-value");
      if (valSpan) valSpan.innerText = value;
    }
  });
}

/* ==========================================================================
   MODEL ROUTE ARENA (BENCHMARK PLAYGROUND)
   ========================================================================== */
function initArena() {
  const benchmarkBtn = document.getElementById("btn-arena-benchmark");
  if (!benchmarkBtn) return;

  benchmarkBtn.addEventListener("click", () => {
    const prompt = document.getElementById("arena-prompt").value.trim();
    const size = document.getElementById("arena-size").value;
    const logic = document.getElementById("arena-logic").value;
    const resultsPanel = document.getElementById("arena-results");

    if (!prompt) {
      alert("Please type a sample query first to benchmark.");
      return;
    }

    benchmarkBtn.innerText = "Benchmarking Routes...";
    benchmarkBtn.disabled = true;

    setTimeout(() => {
      benchmarkBtn.innerText = "Benchmark Route Paths";
      benchmarkBtn.disabled = false;
      resultsPanel.style.display = "block";

      // Benchmarking algorithms
      let winner = "";
      let path = "";
      let cost = "";
      let speed = "";

      if (logic === "high") {
        if (size === "large") {
          winner = "Selected Route: Claude 3.5 Sonnet";
          path = "High Accuracy Tunnels";
          cost = "$0.045 USD";
          speed = "280ms (Ultra Depth)";
        } else {
          winner = "Selected Route: Gemini 1.5 Pro";
          path = "Balanced Reasoner Pipeline";
          cost = "$0.0075 USD";
          speed = "180ms (Optimal Quality)";
        }
      } else {
        if (size === "small") {
          winner = "Selected Route: Mistral 7B (Local Edge)";
          path = "Zero-Cost Local Swarm";
          cost = "$0.0000 USD (Local CPU)";
          speed = "90ms (Sub-millisecond Edge)";
        } else {
          winner = "Selected Route: DeepSeek-V3";
          path = "Fast Cost-Efficient Path";
          cost = "$0.0022 USD";
          speed = "120ms (High-Velocity)";
        }
      }

      document.getElementById("arena-winner-text").innerText = winner;
      document.getElementById("arena-detail-path").innerText = path;
      document.getElementById("arena-detail-cost").innerText = cost;
      document.getElementById("arena-detail-speed").innerText = speed;

      logSecurity(`Prompt Arena benchmarked: Winner is ${winner.split(":")[1].trim()}`);
    }, 1200);
  });
}

/* ==========================================================================
   AUTONOMOUS VENTURE INCUBATOR PIPELINE
   ========================================================================== */
const VENTURE_DATA = {
  drones: {
    title: "AeroSwarm Logistics Network",
    tag: "Swarm Delivery",
    tam: "$28.4 Billion",
    cost: "$0.006 per step",
    confidence: "96.5% Efficiency",
    summary: "A decentralized edge-routed drone flight orchestrator. AeroSwarm uses local LLMs on flight microcontrollers for localized path adjustment, while Claude 3.5 computes global airspace grids, saving 82% of cellular telemetry cost.",
    arch: [
      "Layer 1 (Tauri client): Drone telemetry visualization dashboard",
      "Layer 2 (Agents): Path routing agent & regional collision agent",
      "Layer 3 (Orchestration): Airspace coordinate synchronization pipeline",
      "Layer 4 (Intelligence): Local Mistral (flight controller) + Claude 3.5 (global mapping)"
    ],
    code: `import { UAIXEngine, CustomSkill, AgentRouter } from '@u-aix/sdk';

const engine = new UAIXEngine({ apiKey: process.env.UAIX_API_KEY });
const router = new AgentRouter({ strategy: 'balanced' });

// Setup AeroSwarm Pipeline
const flightRouteResult = await engine.execute({
  steps: [
    { id: 'path_finder', model: 'local/mistral-7b', inputs: { start: 'Grid_A', end: 'Grid_B' } },
    { id: 'airspace_check', model: 'claude-3-5-sonnet', inputs: { coordinates: '{{path_finder.output}}' } }
  ]
});`
  },
  energy: {
    title: "EcoGrid Fusion Optimizer",
    tag: "Energy Fusion",
    tam: "$42.1 Billion",
    cost: "$0.009 per step",
    confidence: "98.1% Grid Accuracy",
    summary: "EcoGrid dynamically allocates community renewable resources and fusion tokamak outputs. Gemini 1.5 analyzes historical weather datasets and load metrics, routing real-time relay switching instructions to zero-cost edge controllers.",
    arch: [
      "Layer 1: Real-time SVG grid visualization interface",
      "Layer 2: Load Forecasting Agent & Grid Stabilizer Agent",
      "Layer 3: Parallel vector context replication across regional grids",
      "Layer 4: Gemini 1.5 Pro (dataset modeling) + DeepSeek-V3 (real-time telemetry routing)"
    ],
    code: `import { UAIXEngine, AgentRouter } from '@u-aix/sdk';

const engine = new UAIXEngine({ apiKey: process.env.UAIX_API_KEY });
const gridRouter = new AgentRouter({ strategy: 'latency' });

const gridOutput = await engine.execute({
  steps: [
    { id: 'load_predict', model: 'gemini-1.5-pro', inputs: { history: 'Grid_Load_Weekly_09' } },
    { id: 'switch_relay', model: 'deepseek-v3', inputs: { target: 'Relay_C4', load: '{{load_predict.output}}' } }
  ]
});`
  },
  agriculture: {
    title: "HydroGlow Hydroponics Suite",
    tag: "Vertical Agriculture",
    tam: "$14.6 Billion",
    cost: "$0.002 per step",
    confidence: "94.8% Crop Integrity",
    summary: "An automated soil-less plant yield engine. Local cameras analyze crop leaf color indexes, running lightweight local classifications, while Gemini 1.5 generates comprehensive nutrition dosing blueprints when anomalies are detected.",
    arch: [
      "Layer 1: Mobile UI dashboard & custom vertical grow layout metrics",
      "Layer 2: Vision Analysis Agent & Pump Controller Agent",
      "Layer 3: Zero-trust sync key exchange for secure telemetry upload",
      "Layer 4: Local edge model (leaf scan) + Gemini 1.5 Pro (molecular nutrient blueprints)"
    ],
    code: `import { UAIXEngine, CustomSkill } from '@u-aix/sdk';

const engine = new UAIXEngine({ apiKey: process.env.UAIX_API_KEY });

const yieldResult = await engine.execute({
  steps: [
    { id: 'crop_health', model: 'local/edge-vision-7b', inputs: { image: 'Leaf_Anomalies_Sector_03' } },
    { id: 'nutrient_dose', model: 'gemini-1.5-pro', inputs: { disease: '{{crop_health.output}}' } }
  ]
});`
  },
  biology: {
    title: "EnzymeSynthesize Biolabs",
    tag: "Autonomous Biology",
    tam: "$55.3 Billion",
    cost: "$0.015 per step",
    confidence: "97.2% Molecule Synthesis",
    summary: "EnzymeSynthesize automates molecular protein structures research pipelines. Claude 3.5 translates abstract research queries into biochemistry chains, routing structural molecular validations to local open-source containers.",
    arch: [
      "Layer 1: Web-based protein molecular visualization model cards",
      "Layer 2: Biochemical Research Agent & Synthesis Validator Agent",
      "Layer 3: Memory broker cross-referencing previous protein folds database",
      "Layer 4: Claude 3.5 Sonnet (molecule mapping) + Local Edge CPU (structure verification)"
    ],
    code: `import { UAIXEngine, CustomSkill } from '@u-aix/sdk';

const engine = new UAIXEngine({ apiKey: process.env.UAIX_API_KEY });

const bioResult = await engine.execute({
  steps: [
    { id: 'protein_map', model: 'claude-3-5-sonnet', inputs: { sequence: 'P53_Cancer_Suppressor' } },
    { id: 'fold_check', model: 'local/alphafold-edge', inputs: { folds: '{{protein_map.output}}' } }
  ]
});`
  }
};

function initIncubator() {
  const runIncBtn = document.getElementById("btn-run-incubator");
  const cta = document.getElementById("incubator-cta");
  const loading = document.getElementById("incubator-loading");
  const result = document.getElementById("incubator-result");

  const step1 = document.getElementById("load-step-1");
  const step2 = document.getElementById("load-step-2");
  const step3 = document.getElementById("load-step-3");
  const step1Status = document.getElementById("load-step-1-status");
  const step2Status = document.getElementById("load-step-2-status");
  const step3Status = document.getElementById("load-step-3-status");

  if (!runIncBtn) return;

  // Subtab navigation inside incubator results
  const subTabs = document.querySelectorAll("#incubator-sub-tabs .arch-tab");
  const subViews = document.querySelectorAll(".inc-sub-view");

  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      subTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const targetId = tab.getAttribute("data-incsub");
      subViews.forEach((v) => {
        v.style.display = "none";
        v.classList.remove("active");
      });
      const activeView = document.getElementById(targetId);
      if (activeView) {
        activeView.style.display = "block";
        activeView.classList.add("active");
      }
    });
  });

  runIncBtn.addEventListener("click", () => {
    const domain = document.getElementById("incubator-domain").value;
    const objective = document.getElementById("incubator-objective").value;

    // Reset view
    cta.style.display = "none";
    result.style.display = "none";
    loading.style.display = "flex";

    // Reset steps
    step1.style.opacity = "0.5";
    step2.style.opacity = "0.5";
    step3.style.opacity = "0.5";
    step1Status.innerText = "Pending";
    step1Status.style.color = "var(--text-muted)";
    step2Status.innerText = "Pending";
    step2Status.style.color = "var(--text-muted)";
    step3Status.innerText = "Pending";
    step3Status.style.color = "var(--text-muted)";

    logSecurity(`Venture Incubator pipeline initiated for domain: ${domain}`);

    // Step 1 animation
    setTimeout(() => {
      step1.style.opacity = "1";
      step1Status.innerText = "COMPLETED";
      step1Status.style.color = "var(--accent-success)";
    }, 600);

    // Step 2 animation
    setTimeout(() => {
      step2.style.opacity = "1";
      step2Status.innerText = "COMPLETED";
      step2Status.style.color = "var(--accent-success)";
    }, 1400);

    // Step 3 animation
    setTimeout(() => {
      step3.style.opacity = "1";
      step3Status.innerText = "COMPLETED";
      step3Status.style.color = "var(--accent-success)";
    }, 2200);

    // Render results
    setTimeout(() => {
      loading.style.display = "none";
      result.style.display = "flex";

      const data = VENTURE_DATA[domain];
      if (!data) return;

      document.getElementById("result-domain-tag").innerText = data.tag;
      document.getElementById("result-venture-title").innerText = data.title;
      document.getElementById("inc-summary-text").innerText = data.summary;
      document.getElementById("inc-metric-tam").innerText = data.tam;
      document.getElementById("inc-metric-cost").innerText = data.cost;
      document.getElementById("inc-metric-confidence").innerText = data.confidence;

      // Render Architecture bullets
      const archList = document.getElementById("inc-arch-list");
      archList.innerHTML = data.arch.map(item => `<li>${item}</li>`).join("");

      // Render Code Box
      const codeBox = document.getElementById("inc-code-box");
      codeBox.innerText = data.code;

      // Select first subtab automatically
      const firstTab = document.querySelector('[data-incsub="inc-summary"]');
      if (firstTab) firstTab.click();

      logSecurity(`Venture Incubator generated blueprint: ${data.title}`);
    }, 2800);
  });

  // Exporter to Agent Studio canvas
  const importBtn = document.getElementById("btn-import-incubator-canvas");
  importBtn.addEventListener("click", () => {
    const domain = document.getElementById("incubator-domain").value;
    const data = VENTURE_DATA[domain];

    if (!data) return;

    // Define custom node sets based on chosen industry
    let importedNodes = [];
    let importedConnections = [];

    if (domain === "drones") {
      importedNodes = [
        { id: "node-drone-1", title: "Drone Telem (Input)", type: "skill", x: 40, y: 120, outputs: ["drone-1-out"], sources: "flight controller telemetry", depth: "Low" },
        { id: "node-drone-2", title: "Collision Router", type: "model", x: 330, y: 50, inputs: ["drone-2-in"], outputs: ["drone-2-out"], temp: 0.2, maxTokens: 512, strategy: "latency" },
        { id: "node-drone-3", title: "Local Path Corrector", type: "model", x: 330, y: 220, inputs: ["drone-3-in"], outputs: ["drone-3-out"], temp: 0.3, maxTokens: 1024, strategy: "cost" },
        { id: "node-drone-4", title: "Claude Global Grid", type: "model", x: 620, y: 130, inputs: ["drone-4-in"], outputs: ["drone-4-out"], temp: 0.1, maxTokens: 4096, strategy: "accuracy" }
      ];
      importedConnections = [
        { from: "drone-1-out", to: "drone-2-in" },
        { from: "drone-1-out", to: "drone-3-in" },
        { from: "drone-2-out", to: "drone-4-in" },
        { from: "drone-3-out", to: "drone-4-in" }
      ];
    } else if (domain === "energy") {
      importedNodes = [
        { id: "node-energy-1", title: "EcoGrid Weather API", type: "skill", x: 40, y: 120, outputs: ["energy-1-out"], sources: "weather feeds", depth: "Medium" },
        { id: "node-energy-2", title: "Gemini Weather Analyst", type: "model", x: 330, y: 50, inputs: ["energy-2-in"], outputs: ["energy-2-out"], temp: 0.5, maxTokens: 4096, strategy: "accuracy" },
        { id: "node-energy-3", title: "DeepSeek Load Optimizer", type: "model", x: 330, y: 220, inputs: ["energy-3-in"], outputs: ["energy-3-out"], temp: 0.2, maxTokens: 2048, strategy: "latency" },
        { id: "node-energy-4", title: "Relay System Switcher", type: "skill", x: 620, y: 130, inputs: ["energy-4-in"], outputs: ["energy-4-out"], sources: "grid relays", depth: "Low" }
      ];
      importedConnections = [
        { from: "energy-1-out", to: "energy-2-in" },
        { from: "energy-1-out", to: "energy-3-in" },
        { from: "energy-2-out", to: "energy-4-in" },
        { from: "energy-3-out", to: "energy-4-in" }
      ];
    } else if (domain === "agriculture") {
      importedNodes = [
        { id: "node-agri-1", title: "Leaf Camera Feed", type: "skill", x: 40, y: 120, outputs: ["agri-1-out"], sources: "leaf camera sector 03", depth: "Low" },
        { id: "node-agri-2", title: "Lightweight Leaf Scan", type: "model", x: 330, y: 50, inputs: ["agri-2-in"], outputs: ["agri-2-out"], temp: 0.2, maxTokens: 512, strategy: "cost" },
        { id: "node-agri-3", title: "Gemini Nutrient Bluepr", type: "model", x: 330, y: 220, inputs: ["agri-3-in"], outputs: ["agri-3-out"], temp: 0.4, maxTokens: 4096, strategy: "accuracy" },
        { id: "node-agri-4", title: "Nutrition Dosing Pump", type: "skill", x: 620, y: 130, inputs: ["agri-4-in"], outputs: ["agri-4-out"], sources: "nutrition relays", depth: "Low" }
      ];
      importedConnections = [
        { from: "agri-1-out", to: "agri-2-in" },
        { from: "agri-2-out", to: "agri-3-in" },
        { from: "agri-3-out", to: "agri-4-in" }
      ];
    } else {
      // biology
      importedNodes = [
        { id: "node-bio-1", title: "P53 Cancer Suppressor", type: "skill", x: 40, y: 120, outputs: ["bio-1-out"], sources: "protein sequencing DB", depth: "Aggressive" },
        { id: "node-bio-2", title: "Claude Protein Mapper", type: "model", x: 330, y: 50, inputs: ["bio-2-in"], outputs: ["bio-2-out"], temp: 0.1, maxTokens: 8192, strategy: "accuracy" },
        { id: "node-bio-3", title: "Local AlphaFold verify", type: "model", x: 330, y: 220, inputs: ["bio-3-in"], outputs: ["bio-3-out"], temp: 0.1, maxTokens: 1024, strategy: "cost" },
        { id: "node-bio-4", title: "Fold Result Synthesis", type: "skill", x: 620, y: 130, inputs: ["node-bio-4-in"], outputs: ["node-bio-4-out"], sources: "protein visualizations", depth: "Medium" }
      ];
      importedConnections = [
        { from: "bio-1-out", to: "bio-2-in" },
        { from: "bio-2-out", to: "bio-3-in" },
        { from: "bio-3-out", to: "node-bio-4-in" }
      ];
    }

    // Set app state nodes
    AppState.nodes = importedNodes;
    AppState.connections = importedConnections;

    // Clear studio canvas visual DOM elements
    const canvas = document.getElementById("studio-canvas");
    canvas.querySelectorAll(".studio-node").forEach((n) => n.remove());

    // Generate new nodes DOM inside canvas workspace
    importedNodes.forEach((node) => {
      let nodeHtml = "";
      if (node.type === "model") {
        nodeHtml = `
          <div class="studio-node" id="${node.id}" style="left: ${node.x}px; top: ${node.y}px;">
            <div class="node-header">
              <div class="node-header-icon ${node.id.includes('claude') || node.title.includes('Claude') ? 'icon-claude' : (node.title.includes('Gemini') ? 'icon-gemini' : 'icon-skill')}">${node.title.substring(0,2).toUpperCase()}</div>
              <div class="node-title">${node.title}</div>
              <div class="node-type">Model</div>
            </div>
            <div class="node-content">
              <div class="node-param-row"><span class="node-param-label">Max Tokens:</span><span class="node-param-value">${node.maxTokens}</span></div>
              <div class="node-param-row"><span class="node-param-label">Temp:</span><span class="node-param-value">${node.temp}</span></div>
            </div>
            ${node.inputs ? `<div class="node-port port-input" data-port-id="${node.inputs[0]}"></div>` : ""}
            ${node.outputs ? `<div class="node-port port-output" data-port-id="${node.outputs[0]}"></div>` : ""}
          </div>
        `;
      } else {
        nodeHtml = `
          <div class="studio-node" id="${node.id}" style="left: ${node.x}px; top: ${node.y}px;">
            <div class="node-header">
              <div class="node-header-icon icon-skill">SK</div>
              <div class="node-title">${node.title}</div>
              <div class="node-type">Skill</div>
            </div>
            <div class="node-content">
              <div class="node-param-row"><span class="node-param-label">Sources:</span><span class="node-param-value">${node.sources}</span></div>
              <div class="node-param-row"><span class="node-param-label">Depth:</span><span class="node-param-value">${node.depth}</span></div>
            </div>
            ${node.inputs ? `<div class="node-port port-input" data-port-id="${node.inputs[0]}"></div>` : ""}
            ${node.outputs ? `<div class="node-port port-output" data-port-id="${node.outputs[0]}"></div>` : ""}
          </div>
        `;
      }
      canvas.insertAdjacentHTML("beforeend", nodeHtml);
      
      // Make new node draggable & clickable
      const element = document.getElementById(node.id);
      
      element.addEventListener("click", (e) => {
        if (e.target.classList.contains("node-port")) return;
        selectNode(element.id);
      });
      
      // Drag Logic
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      const header = element.querySelector(".node-header");
      
      if (header) {
        header.onmousedown = (e) => {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
          };
          document.onmousemove = (ev) => {
            ev = ev || window.event;
            ev.preventDefault();
            pos1 = pos3 - ev.clientX;
            pos2 = pos4 - ev.clientY;
            pos3 = ev.clientX;
            pos4 = ev.clientY;
            const newT = element.offsetTop - pos2;
            const newL = element.offsetLeft - pos1;
            element.style.top = `${newT}px`;
            element.style.left = `${newL}px`;
            node.x = newL;
            node.y = newT;
            if (typeof drawConnections === "function") drawConnections();
          };
        };
      }
    });

    // Close Node Inspector if open
    const inspectorCard = document.getElementById("studio-inspector-card");
    if (inspectorCard) inspectorCard.style.display = "none";

    // Switch view to Agent Studio tab
    const studioTabBtn = document.querySelector('[data-tab="tab-studio"]');
    if (studioTabBtn) {
      studioTabBtn.click();
      
      // Run the workflow automatically in Agent Studio
      setTimeout(() => {
        const studioRunBtn = document.getElementById("btn-run-studio-workflow");
        if (studioRunBtn) {
          // Temporarily mock execution step flow override to represent new venture pipeline
          const terminal = document.getElementById("studio-terminal");
          const outputBox = document.getElementById("studio-output");
          if (!terminal || !outputBox) return;

          terminal.innerHTML = "";
          outputBox.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Executing imported Autonomous Venture blueprint...</span>`;

          const steps = [
            { nodeId: importedNodes[0].id, log: `[Skill Engine] Staging node values. Loading: ${data.title}...`, delay: 500, class: "command" },
            { nodeId: importedNodes[0].id, log: `[Skill Engine] Successfully extracted source variables: ${data.sources}`, delay: 1000, class: "info" },
            { nodeId: importedNodes[1].id, log: `[Orchestrator] Dynamic fallback routing to: ${importedNodes[1].title}`, delay: 1800, class: "info" },
            { nodeId: importedNodes[1].id, log: `[Routing] Payload matched. Active strategy: ${importedNodes[1].strategy}. Complexity analyzed.`, delay: 2600, class: "success" },
            { nodeId: importedNodes[2].id, log: `[Executor] Delegated downstream execution to: ${importedNodes[2].title}`, delay: 3400, class: "info" },
            { nodeId: importedNodes[3].id, log: `[System Sync] Parallel processing complete. Replicating state tokens in memory.`, delay: 4200, class: "success" },
            { nodeId: importedNodes[3].id, log: `[Security] Vector dimension 1536 synchronized with TLS 1.3 encryption. Saved ${data.cost} USD vs base.`, delay: 4800, class: "success" }
          ];

          // Clear execution states
          document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));

          steps.forEach((step, idx) => {
            setTimeout(() => {
              const line = document.createElement("span");
              line.className = `console-line ${step.class}`;
              line.innerText = step.log;
              terminal.appendChild(line);
              terminal.scrollTop = terminal.scrollHeight;

              document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));
              const nodeEl = document.getElementById(step.nodeId);
              if (nodeEl) nodeEl.classList.add("active-executing");

              if (idx === steps.length - 1) {
                setTimeout(() => {
                  document.querySelectorAll(".studio-node").forEach((n) => n.classList.remove("active-executing"));
                  
                  outputBox.innerHTML = `
                    <div style="border-left: 3px solid var(--accent-primary); padding-left: 12px;">
                      <h4 style="font-weight: 700; color: #fff; margin-bottom: 8px;">Consensus Output: ${data.title}</h4>
                      <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                        Autonomous orchestration finished! Generated product metrics grid matching Strategic Objective:
                      </p>
                      <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                        <div style="background: var(--bg-dark); padding: 8px; border-radius: 4px; flex-grow: 1; text-align: center;">
                          <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">TAM Market</span>
                          <div style="font-size: 1.1rem; font-weight: bold; color: var(--accent-success);">${data.tam}</div>
                        </div>
                        <div style="background: var(--bg-dark); padding: 8px; border-radius: 4px; flex-grow: 1; text-align: center;">
                          <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Confidence Rate</span>
                          <div style="font-size: 1.1rem; font-weight: bold; color: var(--accent-secondary);">${data.confidence}</div>
                        </div>
                      </div>
                      <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">✓ Pipeline results saved to memory cache.</span>
                    </div>
                  `;
                  logSecurity(`Imported Venture Pipeline [${data.title}] execution finished successfully.`);
                }, 600);
              }
            }, step.delay);
          });
        }
      }, 500);
    }
  });
}

