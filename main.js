function MyCar(config) {
  // Basic properties
  this.manufacturer = 'Greenlight'
  this.modelNumber = '30166/48'
  this.make = 'Ford'
  this.model = 'Mustang'
  this.year = 1979
  this.scale = '1:64'
  this.event = '63rd Annual Indianapolis 500 Mile Race'
  this.colors = ['White', 'Black']
  this.material = 'Diecast Metal'

  // Modifiable properties
  this.condition = config.condition || 'mint'
  this.packaging = config.packaging || 'blisterPack'
  this.certification = config.certification || 'none'
  this.basePrice = 29.99
  this.modifications = []

  // Condition multipliers for value
  this.conditionValues = {
    mint: 1,
    nearMint: 0.9,
    excellent: 0.8,
    good: 0.7,
  }

  // Packaging multipliers
  this.packagingValues = {
    blisterPack: 1,
    boxed: 0.95,
    loose: 0.7,
  }

  // Certification multipliers
  this.certificationValues = {
    none: 1,
    graded: 1.5,
    authenticated: 1.3,
  }

  /**
   * Calculate current value based on condition and modifications
   */
  this.calculateCurrentValue = function () {
    let value = this.basePrice
    value *= this.conditionValues[this.condition]
    value *= this.packagingValues[this.packaging]
    value *= this.certificationValues[this.certification]
    return value.toFixed(2)
  }

  /**
   * Update model condition
   */
  this.updateCondition = function (newCondition) {
    this.condition = newCondition
    this.modifications.push(`Condition updated to ${newCondition}`)
    updateDisplay()
  }

  /**
   * Update packaging type
   */
  this.updatePackaging = function (newPackaging) {
    this.packaging = newPackaging
    this.modifications.push(`Packaging changed to ${newPackaging}`)
    updateDisplay()
  }

  /**
   * Update certification status
   */
  this.updateCertification = function (newCertification) {
    this.certification = newCertification
    this.modifications.push(`Certification updated to ${newCertification}`)
    updateDisplay()
  }
}

// Create instance
const paceCar = new MyCar({})

/**
 * Update display with current specifications
 */
function updateDisplay() {
  const specsHtml = `
                <h2>Model Specifications</h2>
                <div class="specs-display">
                    <div class="spec-item">
                        <span>Model:</span>
                        <span>${paceCar.year} ${paceCar.make} ${
    paceCar.model
  }</span>
                    </div>
                    <div class="spec-item">
                        <span>Scale:</span>
                        <span>${paceCar.scale}</span>
                    </div>
                    <div class="spec-item">
                        <span>Condition:</span>
                        <span>${
                          paceCar.condition.charAt(0).toUpperCase() +
                          paceCar.condition.slice(1)
                        }</span>
                    </div>
                    <div class="spec-item">
                        <span>Packaging:</span>
                        <span>${
                          paceCar.packaging.charAt(0).toUpperCase() +
                          paceCar.packaging.slice(1)
                        }</span>
                    </div>
                    <div class="spec-item">
                        <span>Certification:</span>
                        <span>${
                          paceCar.certification.charAt(0).toUpperCase() +
                          paceCar.certification.slice(1)
                        }</span>
                    </div>
                </div>
                <div class="price-display">
                    Current Value: $${paceCar.calculateCurrentValue()}
                </div>
                ${generateModificationsList()}
            `

  document.getElementById('specsDisplay').innerHTML = specsHtml
}

/**
 * Generate modifications list HTML
 */
function generateModificationsList() {
  if (paceCar.modifications.length === 0) return ''

  return `
                <div class="modifications-panel active">
                    <h3>Modification History</h3>
                    <ul>
                        ${paceCar.modifications
                          .map((mod) => `<li>${mod}</li>`)
                          .join('')}
                    </ul>
                </div>
            `
}

// Event handler functions
function updateModelCondition(condition) {
  paceCar.updateCondition(condition)
}

function updatePackaging(packaging) {
  paceCar.updatePackaging(packaging)
}

function updateCertification(certification) {
  paceCar.updateCertification(certification)
}

// Initialize display
updateDisplay()
