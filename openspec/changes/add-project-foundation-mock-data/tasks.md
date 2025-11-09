# Implementation Tasks: Add Project Foundation and Mock Data Generation

## 1. Project Initialization
- [ ] 1.1 Verify Next.js is properly configured with TypeScript
- [ ] 1.2 Install shadcn/ui CLI and initialize
- [ ] 1.3 Install Recharts package
- [ ] 1.4 Install Vercel AI SDK and OpenAI SDK
- [ ] 1.5 Configure Tailwind CSS with shadcn theme
- [ ] 1.6 Set up environment variables template (.env.example)

## 2. Data Models and Types
- [ ] 2.1 Create TypeScript interface for Tutor in `/lib/types.ts`
- [ ] 2.2 Define fields: id, name, email, joinDate, totalSessions, avgRating
- [ ] 2.3 Add additional fields: firstSessionSuccessRate, rescheduleRate, noShowCount
- [ ] 2.4 Export types for use across the application

## 3. Mock Data Generation
- [ ] 3.1 Create `/lib/data/generator.ts` file
- [ ] 3.2 Implement `generateTutors()` function to create 50-100 tutors
- [ ] 3.3 Use realistic names (faker library or hand-crafted list)
- [ ] 3.4 Generate valid email addresses
- [ ] 3.5 Randomize join dates over past 2 years
- [ ] 3.6 Initialize numeric fields with default values
- [ ] 3.7 Add script to save generated data to `/data/tutors.json`
- [ ] 3.8 Create npm script: `"generate:data": "tsx lib/data/generator.ts"`

## 4. Data Access Layer
- [ ] 4.1 Create `/lib/data/tutors.ts` for data access functions
- [ ] 4.2 Implement `getTutors()` to read from JSON file
- [ ] 4.3 Implement `getTutorById(id)` for single tutor lookup
- [ ] 4.4 Add error handling for missing or invalid data

## 5. UI Components
- [ ] 5.1 Install shadcn table component: `npx shadcn@latest add table`
- [ ] 5.2 Create `/components/tutors/TutorTable.tsx`
- [ ] 5.3 Display tutor data in responsive table
- [ ] 5.4 Show columns: ID, Name, Email, Join Date, Total Sessions
- [ ] 5.5 Format join date to readable format

## 6. Page Implementation
- [ ] 6.1 Create `/app/tutors/page.tsx`
- [ ] 6.2 Fetch tutors data (server component)
- [ ] 6.3 Render TutorTable with data
- [ ] 6.4 Add page title and description
- [ ] 6.5 Update `/app/page.tsx` with link to tutors page

## 7. Testing and Validation
- [ ] 7.1 Run data generation script
- [ ] 7.2 Verify tutors.json contains 50-100 entries
- [ ] 7.3 Start dev server and navigate to /tutors
- [ ] 7.4 Confirm table displays all tutors correctly
- [ ] 7.5 Check for TypeScript errors: `npm run build`
- [ ] 7.6 Check for linting errors: `npm run lint`

## 8. Documentation
- [ ] 8.1 Add README section on running data generation
- [ ] 8.2 Document data file location and structure
- [ ] 8.3 Add comments to generator functions

