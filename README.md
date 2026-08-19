# Flip AI

Build a polished, mobile-first full-stack web application for personal furniture flipping.

PRODUCT CONCEPT

The app is an AI-powered furniture flipping assistant.

The user can upload:

Photos taken with their phone

Screenshots from Facebook Marketplace

Screenshots from OfferUp

Screenshots from Craigslist

Screenshots from eBay

Multiple images of the same furniture piece

The AI analyzes the furniture, evaluates whether it is worth acquiring, researches relevant resale and design references where technically and legally available, recommends how to transform it, generates an exact step-by-step work plan, creates a materials checklist that remembers what the user already owns, and tracks the project's eventual profit.

The core philosophy is:

The app remembers. The user executes.

The user should not need to remember their process, inventory, materials, previous flips, or what step comes next.

Keep the interface extremely simple, visual, premium, and fast.

This is primarily used from an iPhone in a garage, vehicle, thrift store, or while browsing Marketplace.

Do not make this look like enterprise software.

Think:

Apple-level simplicity

Modern interior design aesthetic

CB2 / Article / Pottery Barn visual inspiration

Large photography

Large buttons

Minimal text

Excellent mobile usability

Warm neutral palette

Premium typography

Subtle animations

Clean cards

No unnecessary charts or clutter

Make the application a responsive Progressive Web App where possible so it can be saved to an iPhone Home Screen and feel like a standalone application.

PRIMARY NAVIGATION

Create four main navigation areas:

Scout

Projects

Materials

Profit

The default home screen should emphasize one large primary action:

+ Scout a Piece

Also show a concise dashboard summary:

Active projects

Expected profit

Materials currently needed

Items ready to list

Total profit

Recent flips

1. SCOUT MODE

Scout Mode answers:

"Should I pick this up?"

Allow the user to upload one or multiple images.

Support normal photos AND screenshots of resale listings.

If a screenshot contains listing text, extract useful visible information such as:

Asking price

Whether it is free

Description

Dimensions

Brand

Seller comments about condition

Material claims

Location when visible

Other useful listing information

Use image analysis to estimate:

Furniture category

Likely construction/material

Solid wood vs veneer vs MDF/particleboard when reasonably identifiable

Approximate style

Approximate age/style era when reasonably identifiable

Visible damage

Missing hardware

Water damage

Swollen MDF/particleboard

Veneer damage

Warping

Structural issues

Potential mold or suspicious staining

Possible pest/insect evidence

Overall cosmetic condition

Restoration potential

Do NOT pretend image analysis is certain when it isn't.

Use labels such as:

Likely

Possible

Unable to determine from photo

SCOUT VERDICT

Generate a prominent result:

🟢 GO GET IT
🟡 MAYBE
🔴 PASS

Also generate:

Flip Score: 0–100

Estimated acquisition cost

Estimated materials cost

Estimated resale range

Estimated profit range

Estimated work time

Estimated profit per labor hour

Difficulty: Easy / Moderate / Advanced

Risk level

Why the app made the recommendation

Make the reasoning short and useful.

Example:

GO GET IT — 87/100

Likely wood dresser with cosmetic wear but no obvious major structural damage.

Estimated materials: $32
Estimated resale: $175–225
Estimated profit: $143–193
Estimated labor: 3–4 hours

2. MARKET + DESIGN RESEARCH

Create an architecture that can later connect to legitimate APIs/search providers for:

eBay comparable listings / sold data where API access permits

Craigslist

other resale-market sources

local resale-market information where technically and legally available

Do NOT implement brittle or unauthorized scraping that violates platform restrictions.

For sources such as Facebook Marketplace or OfferUp where reliable sold-data APIs may not be available, use user-uploaded screenshots and available lawful search data instead.

Separate:

ACTIVE ASKING PRICES

from:

VERIFIED/AVAILABLE SOLD COMPS

Never present asking prices as completed sales.

Weight recommendations based on:

Similarity to furniture

Location when available

Recency

Actual sold price where available

Active asking prices

Furniture category

Style

Condition

The system should eventually learn from the user's OWN completed flips, which should receive increasing weight as their history grows.

3. DESIGN INSPIRATION

After analyzing a piece, generate approximately three makeover directions.

Examples:

Pottery Barn-inspired warm wood

CB2-inspired matte black

West Elm-inspired walnut

Natural oak / Japandi

Cream + brass

Espresso

Vintage restoration

Preserve original wood

Reference legitimate public product/design pages or image-search results when available.

Clearly label these as inspiration, not claims that the user's furniture is an authentic designer piece.

For each direction show:

Inspiration imagery

Style name

Why it suits this particular piece

Expected difficulty

Estimated material cost

Potential resale appeal

Then show:

AI Recommended Direction

with one recommended makeover.

IMPORTANT:

The AI should NOT automatically recommend painting furniture.

If a piece appears to have attractive solid wood, valuable veneer, vintage character, desirable construction, or restoration value, the AI should be able to recommend:

DO NOT PAINT THIS

and instead recommend cleaning, repair, stripping/refinishing, staining, oiling, or preserving the original finish.

4. FLIP PLAN

Once the user accepts a piece, convert it into a Project.

Generate a simple sequential project plan specific to THAT piece.

Example:

Step 1 — Remove hardware
Step 2 — Clean and degrease
Step 3 — Repair loose joints
Step 4 — Fill damaged areas
Step 5 — Scuff sand with 120 grit
Step 6 — Finish scuff sanding with 150 grit
Step 7 — Vacuum sanding dust
Step 8 — Wipe surface clean
Step 9 — Prime
Step 10 — Lightly sand primer if required
Step 11 — Apply first finish coat
Step 12 — Apply second finish coat
Step 13 — Install hardware
Step 14 — Stage and photograph
Step 15 — List for sale

However, DO NOT use this exact generic workflow for every project.

The plan must adapt based on:

Material

Existing finish

Damage

Desired final look

Paint vs stain vs restoration

Product instructions

Whether primer is necessary

Whether chemical stripping is necessary

Whether structural repair is necessary

Show ONE CURRENT STEP prominently.

Example:

NEXT STEP

Scuff Sand

Use 150-grit sandpaper across the existing finish. You are creating adhesion, not removing all of the old finish.

Estimated time: 25 minutes.

[MARK COMPLETE]

When completed, automatically advance to the next step.

The user should not have to remember what comes next.

5. PROJECT STAGES

Every project should have an overall status:

Picked Up
Cleaning
Repair
Sanding
Priming
Painting / Finishing
Hardware
Photography
Listed
Sold

Show progress visually but simply.

Allow progress photos throughout the project.

Store:

Original listing screenshots

Before photos

Repair photos

Sanding photos

Primer photos

Finish photos

Final photos

6. MATERIALS ENGINE

Every accepted project automatically generates a Materials List.

Examples:

120 grit sanding discs

150 grit sanding discs

Degreaser

Microfiber rags

Wood filler

Wood glue

Primer

Furniture/cabinet paint

Stain

Top coat

Foam roller

Brush

Gloves

Appropriate PPE

Replacement hardware

There should NOT be separate "Need It" and "Buy For Project" states.

Keep this extremely simple:

CHECKED = I already have it
UNCHECKED = I need it

The application must maintain persistent household/workshop inventory.

If the user bought 150-grit sanding discs previously, future projects should automatically show:

✓ 150-grit sanding discs

If the user already owns black paint:

✓ Black paint

The user should NOT repeatedly tell the app what they own.

7. MATERIALS RUN

Create a prominent button:

Materials Run

When tapped, combine all unchecked materials required by active projects.

Example:

MATERIALS RUN

Already Have
✓ 120 grit
✓ 150 grit
✓ Wood filler
✓ Primer
✓ Microfiber rags

Need
□ 6 brass drawer pulls
□ Warm walnut stain

Allow the user to check items off while shopping.

When checked as purchased, automatically add the item to inventory.

Add:

CHECK ALL BASICS

for users who already have their standard supplies.

Design the data structure so retailer links and price comparison can later be added for stores such as:

Home Depot

Lowe's

Ace Hardware

Amazon

Do not fabricate live prices.

If live retailer information is unavailable, simply provide the material name and search action.

8. INVENTORY MEMORY

Create a persistent Materials Inventory.

Track:

Material

Category

Quantity when useful

Approximate amount remaining when useful

Date purchased

Purchase price

Projects used on

Low-stock status

Do not make inventory management burdensome.

For reusable tools simply track ownership.

For consumables, allow simple states:

Plenty
Getting Low
Out

Eventually infer likely consumption from project history, but always allow manual correction.

Example:

Primer — Plenty
Black paint — Getting Low
120 grit discs — 3 remaining
150 grit discs — Plenty
Wood filler — Plenty

When inventory is insufficient for a project, automatically add the required material to Materials Run.

9. AI TROUBLESHOOTING

Inside every project include:

Ask About This Step

Allow the user to upload a photo and ask questions such as:

Why is the paint bubbling?

Is this veneer?

Did I sand enough?

Can this damage be repaired?

Should I prime this?

What grit should I use?

Why is the stain blotchy?

The AI should consider:

Project history

Existing photos

Current step

Materials being used

Furniture material

Previous work completed

Provide concise, practical guidance.

For chemical products, sanding dust, lead-paint concerns, ventilation, or PPE, prioritize manufacturer instructions and safe handling. Do not casually recommend mixing chemicals.

10. PROFIT TRACKING

For every project track:

Acquisition cost
Materials actually purchased
Allocated material cost when appropriate
Mileage/pickup expense optional
Sale price
Marketplace/platform fees
Total cash profit
Estimated labor hours
Actual labor hours

Calculate:

Net Profit

and:

Profit Per Hour

Example:

Picked up: FREE
Materials: $31
Sold: $190

NET PROFIT: $159

Time: 3.2 hours

$49.69/hour

11. LEARNING FROM HISTORY

Create a historical database of completed flips.

Track:

Furniture category

Original condition

Acquisition price

Design direction

Finish/color

Materials

Time required

Original list price

Final sale price

Days to sell

Profit

Profit/hour

As data accumulates, surface useful observations.

Examples:

"Coffee tables are currently your highest-profit category per hour."

"Your black-painted pieces have sold faster than cream pieces."

"Nightstands average $74 profit."

"Large dining sets are taking substantially longer to sell."

Do not generate these insights until sufficient actual user data exists.

Never fabricate historical insights.

12. LISTING ASSISTANT

When a project reaches Photography:

Allow final photos to be uploaded.

Generate:

Suggested listing title

Concise description

Suggested list price

Expected sale range

Relevant dimensions

Material description

Honest condition description

Search keywords

Never claim:

Solid wood unless sufficiently established

A designer/manufacturer unless verified

Vintage provenance unless verified

Provide easy copy buttons for Marketplace, OfferUp, Craigslist, etc.

13. PRICE STRATEGY

Track:

Date listed
Original asking price
Current asking price
Offers
Sold price
Days listed

If a project remains unsold, provide OPTIONAL pricing suggestions.

Example:

Listed 8 days
Current price: $225

Suggested action:
Keep at $225
or
Reduce to $199 for faster sale

Do not automatically change external listings.

14. PHOTO ASSISTANT

Before listing, analyze final photos.

Provide simple photography feedback:

Better lighting needed

Remove clutter

Photograph straight-on

Add drawer-open photo

Show hardware close-up

Include top surface

Include any remaining defect

Add dimensions

Do not overcomplicate this.

15. HARDWARE ASSISTANT

Allow close-up photos of existing hardware.

Store:

Hardware type

Approximate finish

Hole spacing entered/measured by user

Number required

Recommend compatible styles.

Never infer exact hole spacing from a photograph unless a reliable scale/reference is present.

16. SHARED HOUSEHOLD ACCESS

Support at least two users sharing the same workspace.

Both users should see:

Projects

Materials inventory

Materials Run

Completed flips

Profit data

Changes should sync.

Create authentication and a shared-workspace data model.

17. GARAGE QUEUE

Prevent free furniture from turning into clutter.

Dashboard should display:

GARAGE QUEUE

Example:

3 Active
1 Ready to List
1 Waiting for Materials

Allow the user to set a maximum number of active furniture projects.

When the user attempts to accept another piece beyond the limit, show a friendly warning:

Garage is full.

Finish or sell one of your current projects before bringing another home.

Allow override.

18. DATA MODEL

Create a sensible backend schema supporting:

Users
Households / Workspaces
Furniture Scouts
Projects
Project Photos
Project Steps
Materials
Inventory
Project Materials
Material Purchases
Market Comparables
Design Inspirations
Listings
Sales
Labor Sessions

Use persistent database storage.

Do not store critical application state only in browser memory.

19. DASHBOARD DESIGN

Mobile dashboard should feel extremely simple.

Top:

Good morning

Then:

+ SCOUT A PIECE

Then compact cards:

Active Projects: 2
Expected Profit: $340
Need to Buy: 3 items
Ready to List: 1

Then:

CURRENT PROJECTS

Each card should use a large image.

Example:

6-Drawer Dresser
SANDING
Estimated Profit: $165

NEXT: 150-GRIT SCUFF SAND

[CONTINUE]

Then:

GARAGE QUEUE

Then recent flips.

Bottom mobile navigation:

Scout | Projects | Materials | Profit

20. DEMO DATA

Create realistic DEMO DATA so the interface is immediately understandable.

Include:

One dresser being sanded

One completed nightstand

One coffee table waiting for materials

Several common inventory materials

Clearly mark all demo data as demo/sample data.

Provide an easy way to delete demo data before real use.

21. MVP PRIORITIES

Build the application architecture correctly, but prioritize a functional MVP.

FIRST PRIORITY:

Excellent mobile UI

Photo/screenshot upload

Scout analysis interface

Scout verdict

Convert scout to project

Project steps

Materials generation

Persistent inventory

Materials Run

Project tracking

Sale/profit tracking

Shared workspace

SECOND PRIORITY:

External market research integrations

Design inspiration search

Advanced price intelligence

Hardware matching

AI troubleshooting

Automatic inventory consumption estimates

Do not sacrifice a clean working MVP by trying to fake integrations that are not yet configured.

If an external API key or provider is required, create the interface and backend service abstraction, then clearly tell me what credential/API must be connected.

Never fabricate search results, sold comps, retailer prices, or AI analysis.

22. EXPERIENCE PRINCIPLE

This application exists because the user does not want to memorize furniture restoration workflows.

The app should remember:

What I own

What I bought

What furniture I have

What I already did

What I need to do next

What materials I need

What similar furniture sells for

What worked on previous flips

What made money

What wasted time

The user should primarily:

Look → Decide → Do → Check Off → Sell

Do not require unnecessary data entry.

If information can safely be inferred from existing project information, infer it.

If confidence is low, ask one simple question rather than inventing an answer.

23. BUILD INSTRUCTIONS

Start by building the full responsive UI, navigation, database schema, authentication/shared workspace, project system, materials inventory, materials run, profit tracker, demo data, and interfaces needed for AI analysis.

Use reusable components and clean architecture.

Optimize for iPhone first but make desktop/tablet responsive.

Make all buttons functional.

Do not create placeholder buttons that do nothing without clearly marking them as coming soon.

After completing the first build, provide me with a concise status report containing ONLY:

What currently works

What is currently simulated/demo

What requires an external API

What you recommend building next

Any credentials or decisions you need from me

Do not redesign or remove requirements simply because an integration is unavailable. Build the interface and architecture so the integration can be connected later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e3739302-a004-4295-9506-3fcff3f69d7e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
