/**
 * Blood Centers Map Screen
 * Tab 3: Find nearby blood banks and donation centers
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Static blood centers data (Pakistan-specific)
// You can replace this with Google Places API later
const BLOOD_CENTERS = [
  {
    id: '1',
    name: 'Shaukat Khanum Memorial Cancer Hospital',
    type: 'Hospital',
    address: '7-A, Block R-3, Johar Town, Lahore',
    phone: '+92-42-35905000',
    city: 'Lahore',
    coordinates: { lat: 31.4686, lng: 74.2641 },
  },
  {
    id: '2',
    name: 'Fatimid Foundation Blood Bank',
    type: 'Blood Bank',
    address: 'Main Jail Road, Lahore',
    phone: '+92-42-35779935',
    city: 'Lahore',
    coordinates: { lat: 31.5497, lng: 74.3436 },
  },
  {
    id: '3',
    name: 'Hussaini Blood Bank',
    type: 'Blood Bank',
    address: 'Hospital Road, Karachi',
    phone: '+92-21-34915169',
    city: 'Karachi',
    coordinates: { lat: 24.8607, lng: 67.0011 },
  },
  {
    id: '4',
    name: 'Pakistan Red Crescent Society',
    type: 'Blood Bank',
    address: 'Sector G-8/2, Islamabad',
    phone: '+92-51-9252415',
    city: 'Islamabad',
    coordinates: { lat: 33.6844, lng: 73.0479 },
  },
  {
    id: '5',
    name: 'Indus Hospital Blood Bank',
    type: 'Hospital',
    address: 'National Highway, Karachi',
    phone: '+92-21-35112709',
    city: 'Karachi',
    coordinates: { lat: 24.8879, lng: 67.0669 },
  },
  {
    id: '6',
    name: 'Services Hospital Blood Bank',
    type: 'Hospital',
    address: 'Jail Road, Lahore',
    phone: '+92-42-99211892',
    city: 'Lahore',
    coordinates: { lat: 31.5449, lng: 74.3247 },
  },
  {
    id: '7',
    name: 'Aga Khan University Hospital',
    type: 'Hospital',
    address: 'Stadium Road, Karachi',
    phone: '+92-21-34930051',
    city: 'Karachi',
    coordinates: { lat: 24.8903, lng: 67.0681 },
  },
  {
    id: '8',
    name: 'PIMS Hospital Blood Bank',
    type: 'Hospital',
    address: 'G-8, Islamabad',
    phone: '+92-51-9261170',
    city: 'Islamabad',
    coordinates: { lat: 33.6953, lng: 73.0521 },
  },
];

export default function MapScreen() {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [filteredCenters, setFilteredCenters] = useState(BLOOD_CENTERS);
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  const cities = ['All', 'Lahore', 'Karachi', 'Islamabad'];

  // Default region (Pakistan center)
  const defaultRegion = {
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  useEffect(() => {
    if (selectedCity === 'All') {
      setFilteredCenters(BLOOD_CENTERS);
    } else {
      setFilteredCenters(
        BLOOD_CENTERS.filter((center) => center.city === selectedCity)
      );
    }
  }, [selectedCity]);

  const handleMarkerPress = (centerId: string) => {
    setSelectedCenter(centerId);
    const center = BLOOD_CENTERS.find((c) => c.id === centerId);
    if (center && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: center.coordinates.lat,
        longitude: center.coordinates.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleCall = (phone: string) => {
    const phoneNumber = Platform.OS === 'ios' ? `telprompt:${phone}` : `tel:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
        } else {
          Alert.alert('Error', 'Phone dialer not available');
        }
      })
      .catch(() => Alert.alert('Error', 'Failed to open dialer'));
  };

  const handleNavigate = (lat: number, lng: number, name: string) => {
    const scheme = Platform.select({ ios: 'maps:', android: 'geo:' });
    const url = Platform.select({
      ios: `${scheme}${lat},${lng}?q=${encodeURIComponent(name)}`,
      android: `${scheme}${lat},${lng}?q=${encodeURIComponent(name)}`,
    });

    if (url) {
      Linking.openURL(url).catch(() =>
        Alert.alert('Error', 'Unable to open maps')
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Blood Centers</Text>
        <Text style={styles.subtitle}>Find nearby blood banks & hospitals</Text>
      </View>

      {/* City Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            style={[
              styles.filterButton,
              selectedCity === city && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCity(city)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCity === city && styles.filterTextActive,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={defaultRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {filteredCenters.map((center) => (
            <Marker
              key={center.id}
              coordinate={{
                latitude: center.coordinates.lat,
                longitude: center.coordinates.lng,
              }}
              title={center.name}
              description={center.address}
              pinColor={center.type === 'Hospital' ? '#2196F3' : '#E53935'}
              onPress={() => handleMarkerPress(center.id)}
            />
          ))}
        </MapView>
      </View>

      {/* Blood Centers List */}
      <ScrollView style={styles.listContainer}>
        {filteredCenters.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🏥</Text>
            <Text style={styles.emptyText}>No centers found</Text>
          </View>
        ) : (
          filteredCenters.map((center) => (
            <TouchableOpacity
              key={center.id}
              style={[
                styles.centerCard,
                selectedCenter === center.id && styles.centerCardSelected,
              ]}
              onPress={() => handleMarkerPress(center.id)}
            >
              {/* Type Badge */}
              <View style={styles.centerHeader}>
                <View
                  style={[
                    styles.typeBadge,
                    center.type === 'Hospital'
                      ? styles.hospitalBadge
                      : styles.bloodBankBadge,
                  ]}
                >
                  <Text style={styles.typeText}>
                    {center.type === 'Hospital' ? '🏥' : '🩸'} {center.type}
                  </Text>
                </View>
                <View style={styles.cityTag}>
                  <Text style={styles.cityTagText}>{center.city}</Text>
                </View>
              </View>

              {/* Name */}
              <Text style={styles.centerName}>{center.name}</Text>

              {/* Address */}
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{center.address}</Text>
              </View>

              {/* Phone */}
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📞</Text>
                <Text style={styles.infoText}>{center.phone}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCall(center.phone)}
                >
                  <Text style={styles.actionIcon}>📞</Text>
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.actionButtonPrimary]}
                  onPress={() =>
                    handleNavigate(
                      center.coordinates.lat,
                      center.coordinates.lng,
                      center.name
                    )
                  }
                >
                  <Text style={styles.actionIcon}>🗺️</Text>
                  <Text style={[styles.actionText, styles.actionTextPrimary]}>
                    Navigate
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxIcon}>💡</Text>
          <View style={styles.infoBoxContent}>
            <Text style={styles.infoBoxTitle}>Important</Text>
            <Text style={styles.infoBoxText}>
              • Always call ahead to check availability{'\n'}
              • Bring valid ID for blood donation{'\n'}
              • Follow donation center guidelines{'\n'}
              • Stay hydrated before donation
            </Text>
          </View>
        </View>

        {/* Emergency */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyIcon}>🚨</Text>
          <Text style={styles.emergencyTitle}>Emergency Blood Needed?</Text>
          <Text style={styles.emergencyText}>
            Contact nearest blood bank immediately{'\n'}
            or call Pakistan Red Crescent: 1030
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    padding: 16,
    gap: 8,
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  filterButtonActive: {
    backgroundColor: '#E53935',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    height: 300,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  centerCardSelected: {
    borderWidth: 2,
    borderColor: '#E53935',
    backgroundColor: '#FFF5F5',
  },
  centerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hospitalBadge: {
    backgroundColor: '#E3F2FD',
  },
  bloodBankBadge: {
    backgroundColor: '#FFE5E5',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cityTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  cityTagText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonPrimary: {
    backgroundColor: '#E53935',
    borderColor: '#E53935',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionTextPrimary: {
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  infoBoxIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoBoxContent: {
    flex: 1,
  },
  infoBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 6,
  },
  infoBoxText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
  emergencyCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  emergencyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 13,
    color: '#C62828',
    textAlign: 'center',
    lineHeight: 20,
  },
});
