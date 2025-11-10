# Smart Eligibility Framework (SEF) - Demo

## Implemented Features by Page

### 1. **results.html** - Offers List (Layer A & D Recovery)

#### Features Implemented:
- **Eligibility Status Badges** on each offer card:
  - `Prima`: Green "Pre-approved" badge
  - `Allianz`: Grey "Eligibility: Pending Verification" badge
  - `MAPFRE`: Yellow "More info required" badge
  - `AXA`: Green "Pre-approved" badge

- **Estimated Price Ranges**: Each offer shows estimated range (e.g., "€750–€780")

- **Loading Overlay**: 2-second animation when clicking "Contratar Online"
  - Animated spinner with message: "Fetching insurer-specific details..."
  - Stores selected insurer in `localStorage`
  - Navigates to `details.html?insurer=<name>`

- **Recovery Mode Banner**: Shown when returning after rejection
  - Yellow alert banner: "We've filtered results to show only insurers that pre-approved your profile"
  - Automatically hides non-pre-approved offers
  - Triggered by `localStorage.getItem('sef_recovery_mode')`

#### Flow:
```
User clicks "Contratar Online" → Loading overlay (2s) → Navigate to Details with insurer parameter
```

---

### 2. **details.html** - Insurer Details (Layer A & B)

#### Features Implemented:

**Layer A - Modular Offer-Specific Mini Forms:**
- **Non-skippable overlay modal** appears on page load
- **5 insurer-specific questions**:
  1. "Have you been claim-free in the last 5 years?" (Yes/No)
  2. "Is there a secondary driver under 25?" (Yes/No)
  3. "Is the vehicle used for business purposes?" (Yes/No/Sometimes)
  4. "How many years have you had your driver's license?" (Dropdown)
  5. "Has the vehicle been modified?" (Yes/No)
- **Dynamic insurer logo** based on URL parameter
- **Form validation** - all questions required
- **Smooth animations** - slide-up animation on submit
- **Data persistence** - answers stored in `localStorage`

**Layer B - Data Verification API Layer:**
- **Verification triggered** when clicking "Continuar" button
- **3-state modal**:
  1. **Loading State** (2s): "Verifying your data with official sources..."
  2. **Mismatch State**: Yellow warning with license points correction field
  3. **Success State**: Green checkmark with "Data verified successfully"
- **Forced data correction** - user must enter license points to proceed
- **Verification status stored** in `localStorage`

#### Flow:
```
Page loads → Mini-form overlay → User fills 5 questions → Submit → Hide overlay →
User sees full details → Clicks "Continuar" → Verification loading (2s) →
Mismatch warning → User corrects data → Success message → Navigate to Personalize
```

---

### 3. **personalize.html** - Optional Add-ons (Layer C)

#### Features Implemented:

**Layer C - Smart Pre-Check API Layer:**
- **Pre-Check Progress Banner** at page top
  - **Loading State** (3s): Animated spinner with "Eligibility Check in Progress..."
  - Animated dots after text for visual feedback
- **Success State**:
  - Green checkmark icon
  - "Eligibility confirmed by Check24"
  - Final price display: "Your final price: €762,33/year"
- **Message Bubble**: "Great news! All your information has been verified successfully."
- **Smooth transitions** between loading and success states

#### Flow:
```
Page loads → Pre-check loading banner (3s) → Success confirmation →
User adds optional coverages → Clicks "Continuar" → Navigate to Contract Form
```

---

### 4. **contract-form.html** - Final User Details (Layer C)

#### Features Implemented:

**Layer C - Pre-Approval Indicators:**
- **Pre-Approval Banner** at page top
  - Green gradient background with checkmark icon
  - "Your information has been pre-approved by [Insurer]"
  - Subtitle: "All your details have been verified..."
- **Verification Checkmarks** on form fields:
  - **Green checkmarks** (✓) on verified critical fields:
    - Name, Surname, DNI, Birth Date, Email, Phone
  - **Grey checkmarks** (✓) on non-critical fields:
    - Postal Code, City, Province
- **Pre-filled data** from previous steps
- **Dynamic insurer name** loaded from `localStorage`

#### Flow:
```
Page loads → Pre-approval banner shown → Form pre-filled with verified data →
User reviews and confirms → Clicks "Continuar al pago" → Navigate to Payment
```

---

### 5. **payment.html** - Payment & Rejection (Layer D)

#### Features Implemented:

**Layer D - Continuous Eligibility and Recovery:**
- **Forced Rejection Simulation** triggered on "Contratar Ahora" click
- **3-state rejection modal**:

  **1. Loading State** (2s):
  - Animated spinner
  - "Processing your request with the insurer..."
  - "Please wait while we finalize your policy"

  **2. Error State**:
  - Large red X icon
  - Title: "Your policy could not be approved"
  - Error message explaining rejection reason
  - Reassurance: "But don't worry — you still have eligible options!"

  **3. Recovery Options**:
  - **"View Alternative Offers"** button (green):
    - Sets `localStorage.setItem('sef_recovery_mode', 'true')`
    - Redirects to `results.html`
    - Shows only pre-approved offers with recovery banner
  - **"Adjust My Coverage"** button (blue):
    - Provides option to modify coverage settings
    - Returns to previous steps for adjustments

#### Flow:
```
User clicks "Contratar Ahora" → Processing overlay (2s) → Rejection modal →
User chooses recovery option → Navigate to Results (filtered) OR back to adjust coverage
```

---

## Complete User Journey

### User Path (with all SEF demonstrations):
1. **Results Page**: User sees offers with eligibility badges, clicks "Contratar Online" button
2. **Loading**: 2-second overlay with spinner
3. **Details Page**:
   - Mini-form overlay appears with 5 questions
   - User answers all questions, clicks "Confirmar"
   - Overlay slides away, full details revealed
   - User clicks "Continuar", verification starts
   - Mismatch warning appears, user corrects license points
   - Success message shown
4. **Personalize Page**:
   - Pre-check progress bar animates for 3 seconds
   - Success: "Eligibility confirmed by Check24"
   - User optionally adds coverages, clicks "Continuar"
5. **Contract Form**:
   - Pre-approval banner at top
   - Form fields show green/grey checkmarks
   - User reviews, clicks "Continuar al pago"
6. **Payment Page**:
   - User enters payment details, clicks "Contratar Ahora"
   - Processing animation (2s)
   - **Rejection appears** with two recovery options
7. **Recovery**:
   - User clicks "View Alternative Offers"
   - Returns to Results page with recovery banner
   - Only pre-approved offers (Prima & AXA) are visible

---

## LocalStorage Data Flow

The framework uses localStorage to persist state across pages:

| Key | Purpose | Set By | Used By |
|-----|---------|--------|---------|
| `sef_selected_insurer` | Selected insurer name | results.html | All pages |
| `sef_flow_started` | User started SEF flow | results.html | All pages |
| `sef_miniform_completed` | Mini-form submitted | details.html | details.html |
| `sef_miniform_answers` | Mini-form responses | details.html | Future use |
| `sef_license_points` | Corrected license data | details.html | Future use |
| `sef_data_verified` | Verification complete | details.html | All pages |
| `sef_eligibility_confirmed` | Pre-check passed | personalize.html | contract-form.html |
| `sef_recovery_mode` | Returning after rejection | payment.html | results.html |

---

## How to Test

### Setup Instructions:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imisstheoldpabl0/check24-demo.git
   ```

2. **Navigate to the clone folder**:
   ```bash
   cd check24-demo/clone
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your web browser and navigate to**:
   ```
   http://localhost:3001
   ```

### Testing the Complete Flow:

1. **Start fresh**: Clear localStorage in browser console
   ```javascript
   localStorage.clear();
   ```

2. **Open**: `results.html`

3. **Click**: "Contratar Online" on any offer (e.g., Prima)
   - Should see 2-second loading overlay
   - Should navigate to details.html with insurer parameter

4. **Fill mini-form**: Answer all 5 questions
   - Cannot skip (non-dismissible overlay)
   - All fields required
   - Click "Confirmar" to proceed

5. **View details**: Explore tabs, then click "Continuar"
   - Verification modal appears
   - Wait 2 seconds for mismatch warning
   - Enter license points (0-12)
   - See success message

6. **Personalize**: Wait for pre-check animation
   - 3-second loading animation
   - Success message with final price
   - Optional: add coverages
   - Click "Continuar"

7. **Contract form**: Review pre-approval
   - Green banner at top
   - Checkmarks on form fields
   - Click "Continuar al pago"

8. **Payment**: Trigger rejection
   - Click "Contratar Ahora"
   - Processing animation (2s)
   - Rejection modal appears
   - Click "View Alternative Offers"

9. **Recovery**: See filtered results
   - Yellow recovery banner appears
   - Only pre-approved offers visible
   - Can restart flow with new insurer

---

## File Structure

```
clone/
├── results.html          Layer A + D
├── details.html          Layer A + B
├── personalize.html      Layer C
├── contract-form.html    Layer C
├── payment.html          Layer D
└── SEF_IMPLEMENTATION_GUIDE.md (this file)
```

---

## SEF Layer Summary

| Layer | Name | Pages | Purpose | Demo Features |
|-------|------|-------|---------|---------------|
| **A** | Modular Offer-Specific Mini Forms | results.html, details.html | Collect insurer-specific data early | Eligibility badges, mini-form overlay |
| **B** | Data Verification API | details.html | Verify user data with official sources | Verification modal, mismatch correction |
| **C** | Smart Pre-Check API | personalize.html, contract-form.html | Pre-approve user before payment | Progress bar, pre-approval banner, checkmarks |
| **D** | Continuous Eligibility & Recovery | payment.html, results.html | Handle rejections gracefully | Rejection modal, filtered results, recovery options |

---

**Implementation Date**: November 10, 2025
**Framework Version**: SEF v1.0
**Status**: Complete and Ready for Demo